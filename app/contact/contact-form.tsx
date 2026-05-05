"use client";

import { useActionState, useState } from "react";
import { LIMITS, type ContactField } from "@/lib/validation/contact";
import { sendContactMessage, type ContactActionState } from "./actions";

const initialState: ContactActionState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const [resetKey, setResetKey] = useState(0);

  const fieldErrors =
    state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const formError =
    state.status === "error" ? state.formError : undefined;
  const values =
    state.status === "error" ? (state.submittedValues ?? {}) : {};

  if (state.status === "success") {
    return (
      <SuccessPanel
        onReset={() => {
          // Force a fresh useActionState by remounting the form. No way to
          // reset useActionState from outside; remount is the supported path.
          setResetKey((k) => k + 1);
        }}
      />
    );
  }

  return (
    <form key={resetKey} action={formAction} className="space-y-6" noValidate>
      <HoneypotField />

      {formError ? (
        <div
          role="alert"
          className="border-l-2 border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </div>
      ) : null}

      {!formError && Object.keys(fieldErrors).length > 0 ? (
        <div
          role="alert"
          className="border-l-2 border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          Please fix the highlighted fields below.
        </div>
      ) : null}

      <Field
        name="name"
        label="Name"
        placeholder="Jane Doe"
        maxLength={LIMITS.NAME_MAX}
        autoComplete="name"
        disabled={isPending}
        error={fieldErrors.name}
        defaultValue={values.name}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        maxLength={LIMITS.EMAIL_MAX}
        autoComplete="email"
        disabled={isPending}
        error={fieldErrors.email}
        defaultValue={values.email}
      />
      <Field
        name="subject"
        label="Subject"
        placeholder="What can we help with?"
        maxLength={LIMITS.SUBJECT_MAX}
        disabled={isPending}
        error={fieldErrors.subject}
        defaultValue={values.subject}
      />
      <TextAreaField
        name="message"
        label="Message"
        placeholder="Tell us a bit about what you're looking for."
        maxLength={LIMITS.MESSAGE_MAX}
        disabled={isPending}
        error={fieldErrors.message}
        defaultValue={values.message}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="btn-tactical inline-flex items-center justify-center gap-3 border border-primary bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <span className="h-1.5 w-1.5 bg-background/80 animate-pulse"></span>
              Transmitting…
            </>
          ) : (
            <>Send Message →</>
          )}
        </button>
      </div>
    </form>
  );
}

function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
    >
      <label>
        Company URL (do not fill)
        <input
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );
}

type FieldProps = {
  name: ContactField;
  label: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
  autoComplete?: string;
  disabled?: boolean;
  error?: string;
  defaultValue?: string;
};

function Field({
  name,
  label,
  placeholder,
  type = "text",
  maxLength,
  autoComplete,
  disabled,
  error,
  defaultValue,
}: FieldProps) {
  const errorId = error ? `${name}-error` : undefined;
  const inputBorder = error
    ? "border-red-500/60 shadow-[0_0_12px_rgba(248,113,113,0.25)]"
    : "border-white/15 focus:border-primary";

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-[10px] font-bold uppercase tracking-[0.3em] text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={autoComplete}
        disabled={disabled}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`w-full border bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${inputBorder}`}
      />
      {error ? (
        <p id={errorId} className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextAreaFieldProps = {
  name: ContactField;
  label: string;
  placeholder: string;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
  defaultValue?: string;
};

function TextAreaField({
  name,
  label,
  placeholder,
  maxLength,
  disabled,
  error,
  defaultValue,
}: TextAreaFieldProps) {
  const errorId = error ? `${name}-error` : undefined;
  const border = error
    ? "border-red-500/60 shadow-[0_0_12px_rgba(248,113,113,0.25)]"
    : "border-white/15 focus:border-primary";

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-[10px] font-bold uppercase tracking-[0.3em] text-muted"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`w-full resize-none border bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${border}`}
      />
      {error ? (
        <p id={errorId} className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="space-y-5 py-4">
      <h3
        className={`text-2xl font-black tracking-tight text-foreground`}
      >
        Message sent
      </h3>
      <p className="text-base leading-relaxed text-muted">
        Thanks — we&apos;ll get back to you within 1–2 business days.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-medium text-primary underline-offset-4 transition hover:underline"
      >
        Send another message
      </button>
    </div>
  );
}
