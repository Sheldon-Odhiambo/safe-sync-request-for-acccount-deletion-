
export default function TermsPage() {
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
          Terms and Conditions
        </h1>

        <p className="text-slate-500 text-sm mb-8">
          Last Updated: November 9, 2026
        </p>

        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Welcome to SafeSync. These Terms and Conditions govern
          your access to and use of the SafeSync website, mobile
          application and related services operated by SafeSync
          Technologies Ltd.
        </p>

        <div className="space-y-10 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using SafeSync, you acknowledge that
              you have read and understood these Terms and agree
              to comply with them. If you do not agree, you should
              discontinue use of the services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              2. About SafeSync
            </h2>
            <p>
              SafeSync provides technology designed to facilitate
              emergency alerts, location sharing, communication
              and coordination between users, organizations and
              authorized emergency responders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              3. User Accounts
            </h2>
            <p>
              Users are responsible for providing accurate
              registration information and maintaining the
              confidentiality of their account credentials.
            </p>
            <p className="mt-3">
              You must notify SafeSync if you suspect unauthorized
              access to your account. You are responsible for
              activities conducted through your account, subject
              to applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              4. Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Submit false or misleading emergency alerts.</li>
              <li>Use SafeSync to harass, threaten or harm others.</li>
              <li>Attempt unauthorized access to the platform.</li>
              <li>Interfere with the operation or security of the services.</li>
              <li>Use the platform for unlawful activities.</li>
              <li>Misuse another person's account or personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              5. Emergency Services Disclaimer
            </h2>
            <p>
              SafeSync is a technology platform intended to support
              emergency communication and response coordination.
              It does not independently operate or guarantee the
              availability of ambulances, fire services, hospitals,
              police or other emergency providers.
            </p>
            <p className="mt-3">
              Response times, service availability and outcomes
              may depend on responder availability, network
              connectivity, location accuracy, infrastructure and
              circumstances beyond our control.
            </p>
            <p className="mt-3">
              SafeSync should not be treated as a replacement for
              contacting the appropriate official emergency
              services directly where necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              6. Location Services
            </h2>
            <p>
              Certain SafeSync features require location permissions
              to facilitate emergency alerts and responder coordination.
              Users are responsible for enabling the relevant device
              permissions when using these features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              7. Privacy and Personal Information
            </h2>
            <p>
              Your use of SafeSync is also governed by our Privacy
              Policy, which explains how we collect, use, disclose
              and protect personal information.
            </p>
            <a href="/privacy" className="text-red-600 font-semibold hover:underline">
              Read our Privacy Policy
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              8. Service Availability
            </h2>
            <p>
              We aim to maintain reliable access to SafeSync.
              However, uninterrupted availability cannot be guaranteed.
              Services may be temporarily unavailable due to
              maintenance, technical issues, network failures
              or circumstances outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              9. Intellectual Property
            </h2>
            <p>
              SafeSync branding, software, designs, content and
              related materials are owned by or licensed to
              SafeSync Technologies Ltd. and are protected by
              applicable intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute or commercially
              exploit protected materials without prior authorization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              10. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by applicable law, SafeSync
              Technologies Ltd. shall not be responsible for losses
              arising from service interruptions, inaccurate
              information provided by users, third-party service
              failures or circumstances outside its reasonable
              control.
            </p>
            <p className="mt-3">
              Nothing in these Terms excludes liability that cannot
              lawfully be excluded under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              11. Account Suspension and Termination
            </h2>
            <p>
              SafeSync may restrict, suspend or terminate access
              where there is reasonable evidence of misuse,
              fraudulent activity, security threats or violations
              of these Terms, subject to applicable law.
            </p>
            <p className="mt-3">
              Users may request account deletion through our
              account deletion page.
            </p>
            <a href="/delete" className="text-red-600 font-semibold hover:underline">
              Request Account Deletion
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              12. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update these Terms when
              necessary. Updated versions will be published on
              this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              13. Governing Law
            </h2>
            <p>
              These Terms shall be governed by the laws of Kenya,
              subject to applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              14. Contact Information
            </h2>
            <p>
              For questions regarding these Terms and Conditions,
              please visit the official SafeSync website:
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
