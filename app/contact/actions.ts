"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactField } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/mail";

export type SubmittedValues = Partial<Record<ContactField, string>>;

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      formError?: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      submittedValues?: SubmittedValues;
    };

function readSubmittedValues(formData: FormData): SubmittedValues {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : undefined;
  };
  return {
    name: get("name"),
    email: get("email"),
    subject: get("subject"),
    message: get("message"),
  };
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function sendContactMessage(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  // Honeypot — silent success without sending. Any non-empty value means a bot
  // filled the off-screen field. Don't tell the bot it was caught.
  const honeypot = formData.get("company_url");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    console.info("[contact] honeypot triggered, dropping submission");
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  const submittedValues = readSubmittedValues(formData);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        (key === "name" ||
          key === "email" ||
          key === "subject" ||
          key === "message") &&
        !fieldErrors[key]
      ) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", fieldErrors, submittedValues };
  }

  const ip = await getClientIp();
  const limit = checkRateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return {
      status: "error",
      formError: "Too many submissions. Please try again in a few minutes.",
      submittedValues,
    };
  }

  const result = await sendContactEmail(parsed.data);

  if (!result.ok) {
    if (result.reason === "config_missing") {
      return {
        status: "error",
        formError:
          "The email service isn't configured yet. Please reach out directly via one of the addresses listed.",
        submittedValues,
      };
    }
    return {
      status: "error",
      formError: "Couldn't send right now. Please try again in a moment.",
      submittedValues,
    };
  }

  console.log(
    JSON.stringify({
      event: "contact_send",
      email: parsed.data.email,
      subject: parsed.data.subject,
      ip,
      ts: new Date().toISOString(),
    }),
  );

  return { status: "success" };
}
