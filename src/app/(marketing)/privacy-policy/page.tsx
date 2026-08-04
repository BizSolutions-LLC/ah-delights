import { PrivacyContent } from "@/features/privacy/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how AhDelights collects, uses, and protects information submitted through our website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-ad-primary-bg px-5 pb-12 pt-32 md:px-20 md:pb-16 md:pt-[180px]">
        <div className="mx-auto flex max-w-[736px] flex-col items-center gap-10 text-center md:gap-[50px]">
          <h1 className="font-display text-4xl font-bold tracking-wide text-ad-primary-text md:text-[52px] md:tracking-[0.04em]">
            <span className="inline-block">Privacy</span>
            <span className="inline-block pl-[0.35em] md:pl-[0.5em]">Policy</span>
          </h1>
          <p className="font-montserrat text-base text-ad-primary-text md:text-lg">
            Effective Date: August 3, 2026
          </p>
        </div>
      </section>
      <section className="bg-ad-primary-bg px-5 pb-20 md:px-20">
        <PrivacyContent />
      </section>
    </>
  );
}
