"use client";

import { useEffect, useState } from "react";
import { BiBookAlt, BiBus, BiCreditCard, BiSpreadsheet } from "react-icons/bi";

type FeeStructureItem = {
  className: string;
  fee: string;
};

type FeeHighlightItem = {
  title: string;
  amount: string;
  time: string;
  description: string;
  type: string;
  accent?: string;
};

const defaultHighlights = [
  {
    title: "Admission Fees",
    amount: "₹ 3,000 - ₹ 5,000",
    time: "one-time",
    description: "One-time admission fee payable at the time of enrollment and varies with the class.",
    type: "Admission",
    accent: "bg-orange-100 text-orange-600",
  },
  {
    title: "Re-Admission Fees",
    amount: "₹ 1,000 - ₹ 2,000",
    time: "each year",
    description: "Applicable for students on re-admission, depending on the class.",
    type: "Re-admission",
    accent: "bg-orange-100 text-orange-600",
  },
  {
    title: "Exam Fees",
    amount: "₹ 500 - ₹ 1,000",
    time: "per term",
    description: "Covers assessment, examination materials, and result processing.",
    type: "Exam",
    accent: "bg-blue-100 text-blue-600",
  },
  {
    title: "Transport Fees",
    amount: "₹ 550 - ₹ 1,200",
    time: "per month",
    description: "Charges vary by route distance and pickup location.",
    type: "Transport",
    accent: "bg-green-100 text-green-600",
  },
];

export default function FeesPage() {
  const [feeStructure, setFeeStructure] = useState<FeeStructureItem[]>([]);
  const [feeHighlights, setFeeHighlights] = useState<FeeHighlightItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFees() {
      try {
        const response = await fetch("/api/fees");
        if (!response.ok) {
          throw new Error("Failed to load fee data");
        }
        const data = await response.json();
        setFeeStructure(data.feeStructure ?? []);
        setFeeHighlights(data.feeHighlights?.length ? data.feeHighlights : defaultHighlights);
      } catch (error: any) {
        setLoadError(error?.message ?? "Unable to load fee data");
        setFeeStructure([]);
        setFeeHighlights(defaultHighlights);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFees();
  }, []);

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
          <p className="text-sm text-center font-semibold uppercase tracking-[0.2em] text-amber-600">Admission</p>
          <h1 className="mt-3 text-center text-4xl font-bold text-white sm:text-5xl">Fee Structure</h1>
          <p className="mt-4 text-center max-w-7xl text-lg text-white/90">
            Review the latest tuition, admission, examination, and transport fee details for the academic session.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <BiBookAlt className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Tuition Fees by Class</h2>
                <p className="text-sm text-gray-600">Monthly tuition fees as pulled from the Fee Structure sheet.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                <span>Class</span>
                <span className="text-center">Monthly Fee</span>
                <span className="text-center">Annual Fee</span>
              </div>
              {isLoading ? (
                <div className="px-4 py-6 text-center text-sm text-gray-500">Loading fee structure…</div>
              ) : feeStructure.length ? (
                feeStructure.map((item) => (
                  <div key={item.className} className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 text-sm text-gray-700 last:border-b-0">
                    <span>{item.className}</span>
                    <span className="font-semibold text-gray-900 text-center">₹ {item.fee}</span>
                    <span className="font-semibold text-gray-900 text-center">₹ {Number(item.fee) * 12}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">No fee structure data is available.</div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm col-span-full text-center text-sm text-gray-500">
                Loading fee highlights…
              </div>
            ) : (
              feeHighlights.map((item) => {
                const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                  "admission fees": BiCreditCard,
                  "re-admission fees": BiCreditCard,
                  "exam fees": BiSpreadsheet,
                  "transport fees": BiBus,
                };
                const normalizedType = item.type?.trim().toLowerCase() || item.title.trim().toLowerCase();
                const Icon = iconMap[normalizedType] || BiCreditCard;

                return (
                  <div key={item.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${item.accent ?? "bg-orange-100 text-orange-600"}`}>
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="text-base font-semibold text-amber-600">{item.title}</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">{item.amount}</p>
                    {item.time && <p className="mt-1 text-sm font-semibold text-gray-600">{item.time}</p>}
                    <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
                  </div>
                );
              })
            )}
          </div>

          <div className="rounded-3xl border border-orange-200 bg-orange-50/70 p-6 text-sm text-gray-700 shadow-sm">
            <p className="font-semibold text-gray-900">Note</p>
            <p className="mt-2">
              Fees are subject to change as per school policy and government guidelines. For the latest updates or payment plans, please contact the school office.
            </p>
            {loadError && <p className="mt-3 text-sm text-red-600">{loadError}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
