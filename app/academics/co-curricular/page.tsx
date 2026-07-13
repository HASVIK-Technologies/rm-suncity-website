import Link from "next/link";

export const metadata = {
  title: "Co-Curricular | RM Suncity Public School",
  description: "Discover the co-curricular activities at RM Suncity Public School.",
};

export default function CoCurricularPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          Academics
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Co-Curricular Activities
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          We believe learning grows beyond the classroom through sports, arts, clubs, and hands-on experiences that build character and confidence.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Sports", text: "Physical activity, teamwork, discipline, and healthy competition." },
            { title: "Arts", text: "Creative expression through drawing, music, dance, and craft activities." },
            { title: "Clubs", text: "Student-led clubs that encourage exploration, leadership, and collaboration." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/academics" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            ← Back to Academics overview
          </Link>
        </div>
      </div>
    </main>
  );
}
