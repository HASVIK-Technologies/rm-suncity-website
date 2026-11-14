import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RM Suncity Public School",
  description: "How RM Suncity Public School handles information shared through its website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-slate-700 sm:px-6">
      <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: 14 November 2026</p>
      <div className="mt-8 space-y-6 leading-7">
        <p>RM Suncity Public School (&quot;the School&quot;) operates this website to share information about the school, admissions, activities, and academic schedules. This draft describes the website as currently implemented. The School should confirm the responsible legal entity, contact details, retention periods, and any additional data practices before publication.</p>
        <section><h2 className="text-xl font-semibold text-slate-900">Information you choose to share</h2><p className="mt-2">The contact form asks for your name and mobile number and optionally a message. It opens WhatsApp with these details in a prefilled message. The website does not submit that form to its own server. If you send the message, WhatsApp and the School will receive it and their respective privacy practices apply. Do not include sensitive personal information or children’s records in the message.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">Third-party content</h2><p className="mt-2">Pages may load Google Maps and YouTube embeds or thumbnails. Those providers may receive technical information, such as your IP address and browser data, when their content loads. You can avoid loading an embed by not opening the page or video that contains it.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">School information and children</h2><p className="mt-2">Public schedules, fee details, notices, photographs, and videos may contain information relating to students. The School should publish photographs, student work, or identifying details only when it has the required permissions and safeguards, and should review public spreadsheets to ensure they contain only information intended for public release.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">Cookies, storage, and security</h2><p className="mt-2">The current website does not intentionally use analytics or advertising trackers and does not use browser storage for a working login. Hosting and security infrastructure may process standard request logs. No internet transmission or storage system can be guaranteed completely secure.</p></section>
        <section><h2 className="text-xl font-semibold text-slate-900">Your choices and contact</h2><p className="mt-2">For questions or requests about information you sent to the School, contact <a className="text-orange-700 underline" href="mailto:rmsuncity2012@gmail.com">rmsuncity2012@gmail.com</a>. Requests about information held by WhatsApp or Google should be directed to those providers. The School should add its verified privacy contact and explain applicable rights and request procedures before relying on this policy as a legal notice.</p></section>
        <p className="rounded-xl bg-amber-50 p-4 text-sm">Publication note: This is a practical draft based on the current site features, not legal advice. Confirm the School’s legal identity, hosting/logging practices, student media permissions, retention and deletion process, and applicable privacy obligations with the School’s counsel.</p>
      </div>
    </main>
  );
}
