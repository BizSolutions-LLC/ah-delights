"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/features/contact/send-contact-message";

const initialState: ContactFormState = {
  ok: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  // React resets uncontrolled forms after an action settles; remount with
  // returned values so failed submissions keep what the user typed.
  const formKey = state.ok
    ? `success-${state.resetKey ?? "done"}`
    : `form-${state.resetKey ?? "idle"}`;

  return (
    <form
      key={formKey}
      action={formAction}
      className="flex w-full max-w-[846px] flex-col gap-7 bg-white p-5 shadow-[0px_5px_10px_5px_rgba(0,0,0,0.1)] md:p-8"
    >
      <Input
        name="fullName"
        label="Full Name"
        hint="e.g John Doe"
        autoComplete="name"
        defaultValue={state.values?.fullName}
        required
      />
      {state.fieldErrors?.fullName ? (
        <p className="-mt-4 text-sm text-[#ed272e]">{state.fieldErrors.fullName}</p>
      ) : null}

      <Input
        name="email"
        type="email"
        label="Email Address"
        hint="e.g name@example.com"
        autoComplete="email"
        defaultValue={state.values?.email}
        required
      />
      {state.fieldErrors?.email ? (
        <p className="-mt-4 text-sm text-[#ed272e]">{state.fieldErrors.email}</p>
      ) : null}

      <Input
        name="phone"
        type="tel"
        label="Phone Number"
        optional
        autoComplete="tel"
        defaultValue={state.values?.phone}
      />

      <Input
        name="subject"
        label="Subject"
        defaultValue={state.values?.subject}
        required
      />
      {state.fieldErrors?.subject ? (
        <p className="-mt-4 text-sm text-[#ed272e]">{state.fieldErrors.subject}</p>
      ) : null}

      <Textarea
        name="message"
        label="Message"
        defaultValue={state.values?.message}
        required
      />
      {state.fieldErrors?.message ? (
        <p className="-mt-4 text-sm text-[#ed272e]">{state.fieldErrors.message}</p>
      ) : null}

      <p className="font-montserrat text-base text-ad-charcoal md:text-lg">
        By submitting this form, you agree that AhDelights may use the
        information you provide to respond to your inquiry.
        <br />
        <br />
        For more information, please review our{" "}
        <Link href="/privacy-policy" className="text-ad-link underline">
          Privacy Policy
        </Link>
        .
      </p>

      <Button
        type="submit"
        disabled={pending}
        className="w-full disabled:opacity-70"
        icon={
          <Image
            src="/icons/icon-send.svg"
            alt=""
            width={14}
            height={14}
            className="size-[14px]"
          />
        }
      >
        {pending ? "Sending..." : "Send Message"}
      </Button>

      {state.message ? (
        <p
          className={`text-center font-montserrat text-base ${
            state.ok ? "text-ad-primary-text" : "text-[#ed272e]"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
