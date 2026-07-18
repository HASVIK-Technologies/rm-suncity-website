"use client";
import { useState } from "react";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight, BiCalendar, BiBook, BiFlag, BiStar } from "react-icons/bi";

const events = [
  { month: "April", day: 1, title: "New Session Begins", type: "academic", color: "bg-blue-500" },
  { month: "April", day: 15, title: "Summer Camp Starts", type: "event", color: "bg-purple-500" },
  { month: "May", day: 1, title: "Labour Day Holiday", type: "holiday", color: "bg-red-500" },
  { month: "May", day: 15, title: "Summer Break Begins", type: "break", color: "bg-amber-500" },
  { month: "July", day: 1, title: "School Reopens", type: "academic", color: "bg-blue-500" },
  { month: "July", day: 15, title: "PTM - Term 1", type: "meeting", color: "bg-green-500" },
  { month: "August", day: 15, title: "Independence Day", type: "holiday", color: "bg-red-500" },
  { month: "September", day: 5, title: "Teacher's Day", type: "event", color: "bg-purple-500" },
  { month: "October", day: 2, title: "Gandhi Jayanti", type: "holiday", color: "bg-red-500" },
  { month: "October", day: 15, title: "Dussehra Break", type: "break", color: "bg-amber-500" },
  { month: "November", day: 1, title: "Diwali Holidays", type: "holiday", color: "bg-red-500" },
  { month: "November", day: 14, title: "Children's Day", type: "event", color: "bg-purple-500" },
  { month: "December", day: 25, title: "Christmas Celebration", type: "event", color: "bg-purple-500" },
  { month: "December", day: 31, title: "Winter Break Begins", type: "break", color: "bg-amber-500" },
  { month: "January", day: 1, title: "New Year", type: "holiday", color: "bg-red-500" },
  { month: "January", day: 14, title: "Winter Break Ends", type: "academic", color: "bg-blue-500" },
  { month: "January", day: 26, title: "Republic Day", type: "holiday", color: "bg-red-500" },
  { month: "February", day: 14, title: "Annual Day", type: "event", color: "bg-purple-500" },
  { month: "March", day: 10, title: "Final Exams Begin", type: "academic", color: "bg-blue-500" },
  { month: "March", day: 31, title: "Session Ends", type: "academic", color: "bg-blue-500" },
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const legend = [
  { label: "Academic", color: "bg-blue-500" },
  { label: "Holiday", color: "bg-red-500" },
  { label: "Event", color: "bg-purple-500" },
  { label: "Break", color: "bg-amber-500" },
  { label: "Meeting", color: "bg-green-500" },
];

export default function CalenderPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const monthEvents = events.filter((e) => months.indexOf(e.month) === selectedMonth);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.82), rgba(30, 64, 175, 0.62)), url('/images/Leave.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Academics</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Academic Calendar</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Stay updated with important dates, events, holidays, and academic milestones throughout the year.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Month Selector */}
          <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/50">
            <button
              onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
              className="rounded-xl p-2 transition-colors hover:bg-gray-100"
            >
              <BiChevronLeft size={24} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{months[selectedMonth]} 2025</h2>
            <button
              onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
              className="rounded-xl p-2 transition-colors hover:bg-gray-100"
            >
              <BiChevronRight size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Quick Month Grid */}
          <div className="mb-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(index)}
                className={`rounded-xl py-2 text-center text-xs font-medium transition-all sm:py-3 sm:text-sm ${
                  selectedMonth === index
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <BiCalendar className="text-xl text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Events & Dates</h3>
                </div>

                {monthEvents.length > 0 ? (
                  <div className="space-y-3">
                    {monthEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-orange-200 hover:bg-orange-50/30"
                      >
                        <div className={`flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl text-white ${event.color}`}>
                          <span className="text-xs font-medium opacity-80">{months[selectedMonth].slice(0, 3)}</span>
                          <span className="text-lg font-bold leading-none">{event.day}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <p className="mt-1 text-sm text-gray-500 capitalize">{event.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <BiCalendar className="text-2xl text-gray-400" />
                    </div>
                    <p className="text-gray-500">No events scheduled for this month</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Legend */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
                <h3 className="mb-4 font-bold text-gray-900">Legend</h3>
                <div className="space-y-3">
                  {legend.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
                <h3 className="mb-4 font-bold text-gray-900">Year at a Glance</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                      <BiBook className="text-lg text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{events.filter((e) => e.type === "academic").length}</p>
                      <p className="text-xs text-gray-500">Academic Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                      <BiFlag className="text-lg text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{events.filter((e) => e.type === "holiday").length}</p>
                      <p className="text-xs text-gray-500">Holidays</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                      <BiStar className="text-lg text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{events.filter((e) => e.type === "event").length}</p>
                      <p className="text-xs text-gray-500">Events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-10">
            <Link href="/academics" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700">
              ← Back to Academics overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
