import nodemailer, { type Transporter } from "nodemailer";
import { PRIMARY, PRIMARY_RGB } from "./theme";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

type SmtpEnvResult =
  | { ok: true; config: SmtpConfig }
  | { ok: false; missing: string[] };

const REQUIRED_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "CONTACT_TO_EMAIL",
] as const;

function readSmtpEnv(): SmtpEnvResult {
  const missing = REQUIRED_VARS.filter((k) => !process.env[k]);
  if (missing.length > 0) return { ok: false, missing };

  const portRaw = process.env.SMTP_PORT!;
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port)) {
    return { ok: false, missing: ["SMTP_PORT (not a number)"] };
  }

  return {
    ok: true,
    config: {
      host: process.env.SMTP_HOST!,
      port,
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
      from: process.env.SMTP_FROM!,
      to: process.env.CONTACT_TO_EMAIL!,
    },
  };
}

let cachedTransporter: Transporter | null = null;
let cachedConfigKey: string | null = null;

function getTransporter(config: SmtpConfig): Transporter {
  const key = `${config.host}:${config.port}:${config.secure}:${config.user}`;
  if (cachedTransporter && cachedConfigKey === key) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  cachedConfigKey = key;
  return cachedTransporter;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPlainText(input: ContactEmailInput): string {
  return [
    `From: ${input.name} <${input.email}>`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");
}

function buildHtml(input: ContactEmailInput): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const subject = escapeHtml(input.subject);
  const message = escapeHtml(input.message);

  // Table layout + inline styles only — flex/grid die in Outlook, <head> styles
  // get stripped by Gmail. Accent color is sourced from lib/theme.ts so the
  // email template stays in step with the live site's --primary token.
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'JetBrains Mono','Courier New',monospace;color:#e6e6e6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#141414;border:1px solid rgba(${PRIMARY_RGB},0.4);">
          <tr>
            <td style="height:2px;background:${PRIMARY};line-height:0;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="font-size:10px;letter-spacing:0.25em;color:#888;text-transform:uppercase;">From</div>
                    <div style="margin-top:6px;font-size:14px;color:#fff;">${name} &lt;${email}&gt;</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="font-size:10px;letter-spacing:0.25em;color:#888;text-transform:uppercase;">Subject</div>
                    <div style="margin-top:6px;font-size:14px;color:#fff;">${subject}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <div style="font-size:10px;letter-spacing:0.25em;color:#888;text-transform:uppercase;">Message</div>
                    <pre style="margin:8px 0 0 0;padding:0;font-family:inherit;font-size:13px;line-height:1.6;color:#e6e6e6;white-space:pre-wrap;word-break:break-word;">${message}</pre>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export type ContactEmailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendContactEmailResult =
  | { ok: true }
  | { ok: false; reason: "config_missing" | "send_failed"; detail?: string };

export async function sendContactEmail(
  input: ContactEmailInput,
): Promise<SendContactEmailResult> {
  const env = readSmtpEnv();
  if (!env.ok) {
    console.warn(
      `[contact] SMTP not configured — missing: ${env.missing.join(", ")}`,
    );
    return { ok: false, reason: "config_missing" };
  }

  const transporter = getTransporter(env.config);

  try {
    await transporter.sendMail({
      from: env.config.from,
      to: env.config.to,
      replyTo: `${input.name} <${input.email}>`,
      subject: `[Sigil contact] ${input.subject}`,
      text: buildPlainText(input),
      html: buildHtml(input),
    });
    return { ok: true };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[contact] sendMail failed: ${detail}`);
    return { ok: false, reason: "send_failed", detail };
  }
}
