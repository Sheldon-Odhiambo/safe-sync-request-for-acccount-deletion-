export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-[#ED111C] text-white px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            SafeSync
          </a>
          <span className="text-sm font-medium">Account Support</span>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
          Account Management
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
          Delete Your SafeSync Account
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed">
          You have the right to request the deletion of your SafeSync
          account and associated personal information. This page explains
          how to submit an account deletion request.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 mt-10 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to request account deletion
          </h2>

          <ol className="space-y-5 text-slate-600 list-decimal pl-5">
            <li>
              Contact the SafeSync support team using the official
              contact details provided in the application.
            </li>
            <li>
              Submit a request using the email address associated
              with your SafeSync account.
            </li>
            <li>
              Complete any identity verification required to
              protect your account.
            </li>
            <li>
              Our team will review your request and communicate
              the next steps.
            </li>
          </ol>
        </div>

        <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-red-700 mb-3">
            What happens when your account is deleted?
          </h2>

          <ul className="space-y-3 text-slate-700 list-disc pl-5">
            <li>Your account access will be discontinued.</li>
            <li>Your personal profile information will be scheduled
              for deletion.</li>
            <li>Associated personal data will be handled in accordance
              with our Privacy Policy.</li>
            <li>Some information may be retained where required by
              applicable laws, regulations, or legitimate safety and
              security obligations.</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Need assistance?
          </h2>
          <p className="text-slate-600 leading-relaxed">
            If you have questions about account deletion, please
            contact the SafeSync support team through the official
            support channels available in our application.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-5 text-sm font-semibold">
          <a href="/privacy" className="text-red-600 hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-red-600 hover:underline">
            Terms & Conditions
          </a>
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
