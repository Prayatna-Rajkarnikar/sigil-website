import { z } from "zod";

export const LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  SUBJECT_MIN: 3,
  SUBJECT_MAX: 150,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 5000,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(LIMITS.NAME_MIN, "Required")
    .max(LIMITS.NAME_MAX, `Too long (max ${LIMITS.NAME_MAX})`),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(LIMITS.EMAIL_MAX, `Too long (max ${LIMITS.EMAIL_MAX})`)
    .transform((s) => s.toLowerCase()),
  subject: z
    .string()
    .trim()
    .min(LIMITS.SUBJECT_MIN, `At least ${LIMITS.SUBJECT_MIN} characters`)
    .max(LIMITS.SUBJECT_MAX, `Too long (max ${LIMITS.SUBJECT_MAX})`),
  message: z
    .string()
    .trim()
    .min(LIMITS.MESSAGE_MIN, `At least ${LIMITS.MESSAGE_MIN} characters`)
    .max(LIMITS.MESSAGE_MAX, `Too long (max ${LIMITS.MESSAGE_MAX})`),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
