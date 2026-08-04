"use server";

import { z } from "zod";
import { getContactEmailConfig, getResendClient } from "@/lib/resend";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, "Please enter a subject."),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message (at least 10 characters)."),
});

export type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
  values?: ContactFormValues;
  /** Bumps on each failed submit so the form remounts with preserved values. */
  resetKey?: number;
};

function readFormValues(formData: FormData): ContactFormValues {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readFormValues(formData);

  const parsed = contactSchema.safeParse({
    fullName: values.fullName,
    email: values.email,
    phone: values.phone || undefined,
    subject: values.subject,
    message: values.message,
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        !fieldErrors[key as keyof typeof fieldErrors]
      ) {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
      values,
      resetKey: Date.now(),
    };
  }

  const { fullName, email, phone, subject, message } = parsed.data;

  try {
    const resend = getResendClient();
    const { to, from } = getContactEmailConfig();

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[AhDelights Customer Message] ${subject}`,
      text: [
        "New message from the AhDelights website form:",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New AhDelights website message</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        ok: false,
        message:
          "We couldn’t send your message right now. Please try again shortly.",
        values,
        resetKey: Date.now(),
      };
    }

    return {
      ok: true,
      message:
        "Thank you for reaching out to AhDelights. We’ll review your message and respond as soon as we can.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      ok: false,
      message:
        "We couldn’t send your message right now. Please try again shortly.",
      values,
      resetKey: Date.now(),
    };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
