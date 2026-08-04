import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export function getContactEmailConfig() {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to) {
    throw new Error("CONTACT_TO_EMAIL is not configured");
  }
  if (!from) {
    throw new Error("CONTACT_FROM_EMAIL is not configured");
  }
  return { to, from };
}
