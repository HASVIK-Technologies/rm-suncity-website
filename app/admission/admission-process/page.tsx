import Link from "next/link";
import { BiBookOpen, BiCalendarCheck, BiCheckCircle, BiClipboard, BiGroup, BiPhoneCall } from "react-icons/bi";
import { CONTACT } from "@/config/contact";

const steps = [
  {
    title: "1. Inquiry & Campus Visit",
    description:
      "Parents can begin by contacting the school office or visiting the campus to understand the academic environment, facilities, and overall school culture.",
    icon: BiPhoneCall,
  },
  {
    title: "2. Admission Form Submission",
    description:
      "Fill out the admission form with accurate student and parent details. Supporting documents such as birth certificate, previous report cards, and address proof may be requested.",
    icon: BiClipboard,
  },
  {
    title: "3. Interaction & Assessment",
    description:
      "A short interaction or assessment may be conducted depending on the class applied for. This helps us understand the child’s readiness and academic preparedness.",
    icon: BiGroup,
  },
  {
    title: "4. Fee Confirmation & Enrollment",
    description:
      "Once selected, parents are informed about the fee structure and admission formalities. Admission is confirmed after document verification and payment of the applicable fees.",
    icon: BiCalendarCheck,
  },
];

const documents = [
  "Birth certificate",
  "Previous school report card / transfer certificate",
  "Photographs of the child and parents",
  "Address proof",
  "Any other documents requested by the school",
];

export default function AdmissionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50">
      <section
        className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.82), rgba(30, 64, 175, 0.62)), url('/images/Leave.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm text-center font-semibold uppercase tracking-[0.2em] text-amber-600">Admissions</p>
          <h1 className="mt-3 text-center text-4xl font-bold text-white sm:text-5xl">Admission Process</h1>
          <p className="mt-4 text-center max-w-7xl text-lg text-white/90">
            A simple and transparent admission journey designed to help parents and students feel confident at every step.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <BiBookOpen className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">How the admission process works</h2>
                <p className="text-sm text-gray-600">From the first enquiry to final enrollment, we keep the process clear and supportive.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900">Required documents</h3>
              <ul className="mt-4 space-y-3">
                {documents.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                    <BiCheckCircle className="mt-0.5 flex-shrink-0 text-lg text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-orange-200 bg-orange-50/70 p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold text-gray-900">Need help?</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                For admission enquiries, class availability, or fee-related questions, please contact the school office.
              </p>
              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <p>Phone: <span className="ms-1 font-medium">{CONTACT.phoneDisplay}</span></p>
                <p>Manager: <span className="ms-1 font-medium">{CONTACT.managerPhoneNumber}</span></p>
                <p>Email: <span className="ms-1 font-medium">{CONTACT.email}</span></p>
                <p>WhatsApp: <span className="ms-1 font-medium">{CONTACT.whatsappDisplay}</span></p>
              </div>
              <a
                href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Hello, I would like to enquire about admissions at RM Suncity Public School.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-semibold text-gray-900">Why parents choose us</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                "Safe and caring learning environment",
                "Focus on academics and value-based education",
                "Regular communication with parents",
              ].map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
