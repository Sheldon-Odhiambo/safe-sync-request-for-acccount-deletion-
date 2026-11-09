
export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-[#ED111C] text-white px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <a href="/" className="text-2xl font-bold">
            SafeSync
          </a>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-sm uppercase tracking-widest text-red-600 font-semibold">
          Legal Information
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
          Privacy Policy
        </h1>

        <p className="text-slate-500 text-sm mb-8">
          Last Updated: November 9, 2026
        </p>

        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          SafeSync Technologies Ltd. is committed to protecting
          your privacy and personal information. This Privacy Policy
          explains how we collect, use, store, process and protect
          information when you use our website, mobile application
          and related services.
        </p>

        <div className="space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              1. Information We Collect
            </h2>
            <p>
              Depending on how you use SafeSync, we may collect
              the following categories of information:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Personal identification and account information.</li>
              <li>Contact details such as email addresses and phone numbers.</li>
              <li>Organization and profile information.</li>
              <li>Device information and technical identifiers.</li>
              <li>Location information when location services are enabled
                and required for emergency response.</li>
              <li>Emergency reports, incident details and response records.</li>
              <li>Communications and support requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p>We may use collected information to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Create and manage user accounts.</li>
              <li>Facilitate emergency alerts and response coordination.</li>
              <li>Share relevant location information with authorized responders
                when necessary for an emergency.</li>
              <li>Communicate important service notifications.</li>
              <li>Maintain platform security and prevent misuse.</li>
              <li>Improve our services and user experience.</li>
              <li>Meet applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              3. Location Information
            </h2>
            <p>
              SafeSync may access your device location when you grant
              the necessary permissions. Location information supports
              emergency reporting, location sharing and responder
              coordination.
            </p>
            <p className="mt-3">
              Location access and sharing are subject to your device
              permissions and the features you use. You can manage
              location permissions through your device settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              4. Information Sharing
            </h2>
            <p>
              We do not sell your personal information. We may share
              relevant information with authorized emergency responders,
              service providers, organizations using SafeSync and
              relevant authorities where necessary to provide our
              services, protect users or comply with the law.
            </p>
            <p className="mt-3">
              Access to personal information should be limited to
              authorized individuals who require it for legitimate
              operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              5. Data Security
            </h2>
            <p>
              SafeSync implements appropriate technical and organizational
              safeguards intended to protect personal information against
              unauthorized access, disclosure, alteration, loss and misuse.
              However, no internet-based system can guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary
              to provide our services, meet operational requirements,
              resolve disputes and comply with applicable legal obligations.
              Retention periods may vary depending on the type of information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              7. Your Privacy Rights
            </h2>
            <p>
              Subject to applicable law, you may have the right to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Request access to your personal information.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Object to or request restriction of certain processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              8. Third-Party Services
            </h2>
            <p>
              Our platform may integrate with third-party services
              necessary for functionality, communications, hosting,
              mapping and other operational purposes. Such services
              may process information in accordance with their own
              privacy policies and applicable agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              9. Children's Privacy
            </h2>
            <p>
              Our services are not intended to collect children's
              personal information without an appropriate legal basis
              and necessary parental or guardian involvement where
              required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time.
              Changes will be published on this page together with
              an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              11. Contact Us
            </h2>
            <p>
              For privacy-related questions, requests or complaints,
              please contact SafeSync Technologies Ltd. through the
              official contact channels published on our website.
            </p>
            <a href="https://www.safesync.co.ke"
              className="text-red-600 font-semibold hover:underline">
              www.safesync.co.ke
            </a>
          </section>

        </div>
      </section>

      <footer className="bg-[#101B35] text-white py-8 px-6">
        <div className="max-w-5xl mx-auto text-sm text-slate-300">
          © {new Date().getFullYear()} SafeSync Technologies Ltd.
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
