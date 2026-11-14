import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | RM Suncity Public School",
  description: "Terms for using the RM Suncity Public School website.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-slate-700 sm:px-6">
      <h1 className="text-4xl font-bold text-slate-900">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 14 November 2026</p>
      <div className="mt-8 space-y-6 leading-7">
        <p>This website is provided by RM Suncity Public School for general information. By using it, you agree to use it lawfully and not to interfere with its operation or attempt unauthorized access.</p>
        <section><h2 className="text-xl font-semibold text-slate-900">Information may change</h2><p className="mt-2">Fees, calendars, schedules, admission information, and notices are provided for convenience and may change or contain errors. Contact the School directly to confirm current information before relying on it or making a payment. Nothing on this website by itself guarantees admission or a particular service.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">Content and external services</h2><p className="mt-2">Website content is owned by or used with permission by the School and may not be reused in a way that violates applicable rights. Links and embeds from third parties are provided for convenience; the School does not control their content, availability, or privacy practices.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">Availability and liability</h2><p className="mt-2">The School aims to keep information available and accurate but does not promise uninterrupted access or that every item is error-free. To the extent permitted by applicable law, the School is not responsible for losses arising from reliance on outdated website information or temporary service interruptions. These terms do not limit rights that cannot legally be limited.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">Contact</h2><p className="mt-2">For website questions, contact <a className="text-orange-700 underline" href="mailto:rmsuncity2012@gmail.com">rmsuncity2012@gmail.com</a>. Governing law, dispute venue, the School’s legal entity name, and any additional required consumer terms should be confirmed by the School’s counsel before publication.</p></section>
        <p className="rounded-xl bg-amber-50 p-4 text-sm">Publication note: This is a draft for review, not legal advice. Replace or confirm these terms with advice appropriate to the School and applicable jurisdictions.</p>
      </div>
    </main>
  );
}
