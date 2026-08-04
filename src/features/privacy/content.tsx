import { siteConfig } from "@/lib/site";

export function PrivacyContent() {
  return (
    <div className="mx-auto flex max-w-[1060px] flex-col gap-6 font-montserrat text-base text-ad-primary-text md:text-lg">
      <p>
        <strong className="font-bold">AhDelights</strong> respects your privacy
        and is committed to protecting the personal information you share with
        us. This Privacy Policy explains how we collect, use, and protect
        information submitted through our website.
      </p>

      <h2 className="font-bold">1. Information We Collect</h2>
      <div>
        <p className="mb-3">When you use our contact form, we may collect:</p>
        <ul className="list-disc space-y-1 pl-7">
          <li>Full name</li>
          <li>Email address</li>
          <li>Subject</li>
          <li>Message and other information you choose to provide</li>
        </ul>
        <p className="mt-3">
          We collect this information only to respond to your inquiry and
          provide assistance related to our products and services.
        </p>
      </div>

      <h2 className="font-bold">2. How We Use Your Information</h2>
      <div>
        <p className="mb-3">We may use the information you provide to:</p>
        <ul className="list-disc space-y-1 pl-7">
          <li>Respond to your questions or inquiries</li>
          <li>Provide information about our pastries and products</li>
          <li>Assist with order-related requests</li>
          <li>Communicate with you regarding your message</li>
          <li>Improve our website and customer service</li>
        </ul>
        <p className="mt-3">We do not sell or rent your personal information.</p>
      </div>

      <h2 className="font-bold">3. How We Share Your Information</h2>
      <div>
        <p className="mb-3">
          AhDelights does not sell, trade, or share your personal information
          for advertising purposes.
        </p>
        <p className="mb-3">We may share information only when necessary to:</p>
        <ul className="list-disc space-y-1 pl-7">
          <li>Operate and maintain our website</li>
          <li>Respond to your inquiry or provide a requested service</li>
          <li>Comply with applicable laws or legal requirements</li>
          <li>
            Protect the rights, safety, or property of AhDelights and others
          </li>
        </ul>
      </div>

      <h2 className="font-bold">4. Cookies and Website Information</h2>
      <div>
        <p className="mb-3">
          Our website may use cookies or similar technologies to support website
          functionality, understand how visitors use the site, and improve the
          user experience.
        </p>
        <p>
          You may manage or disable cookies through your browser settings. Some
          website features may not function properly if cookies are disabled.
        </p>
      </div>

      <h2 className="font-bold">5. Social Media Links</h2>
      <div>
        <p className="mb-3">
          Our website includes links to our Facebook and Instagram pages. When
          you click these links, you will be directed to third-party platforms
          that operate under their own privacy policies.
        </p>
        <p>
          AhDelights is not responsible for the privacy practices or content of
          third-party websites or social media platforms.
        </p>
      </div>

      <h2 className="font-bold">6. Data Security</h2>
      <div>
        <p className="mb-3">
          We take reasonable administrative and technical measures to protect
          the personal information submitted through our website.
        </p>
        <p>
          However, no method of online transmission or electronic storage is
          completely secure. While we work to protect your information, we
          cannot guarantee absolute security.
        </p>
      </div>

      <h2 className="font-bold">7. Data Retention</h2>
      <p>
        We retain personal information only for as long as reasonably necessary
        to respond to inquiries, provide requested services, maintain
        appropriate business records, or meet legal obligations.
      </p>

      <h2 className="font-bold">8. Your Privacy Choices</h2>
      <div>
        <p className="mb-3">
          Depending on where you live and applicable privacy laws, you may have
          rights regarding your personal information, including the right to:
        </p>
        <ul className="list-disc space-y-1 pl-7">
          <li>Request access to your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of certain personal information</li>
          <li>Ask questions about how your information is used</li>
        </ul>
        <p className="mt-3">
          To submit a privacy-related request, contact us using the information
          below.
        </p>
      </div>

      <h2 className="font-bold">9. Children’s Privacy</h2>
      <div>
        <p className="mb-3">
          The AhDelights website is not intended for children under the age of
          13, and we do not knowingly collect personal information from children
          under 13.
        </p>
        <p>
          If you believe a child has provided personal information through our
          website, please contact us so we can review and remove the information
          when appropriate.
        </p>
      </div>

      <h2 className="font-bold">10. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and the Effective Date will be updated accordingly.
      </p>

      <h2 className="font-bold">11. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how your information
        is handled, please contact us:
        <br />
        <br />
        AhDelights
        <br />
        Email: {siteConfig.privacyEmail}
      </p>
    </div>
  );
}
