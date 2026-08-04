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
      <section className="bg-ad-primary-bg px-5 pb-10 pt-24 md:px-20 md:pb-12 md:pt-[120px]">
        <div className="mx-auto flex max-w-[736px] flex-col gap-6 text-center">
          <h1 className="font-display text-4xl font-bold text-ad-primary-text md:text-[52px]">
            Privacy Policy
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
