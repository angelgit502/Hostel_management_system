import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white pt-16 px-4">
      <div className="max-w-3xl mx-auto text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-semibold mb-8 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Modern Hostel Management Platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 leading-tight tracking-tight">
          Welcome to{" "}
          <span className="text-indigo-600">HomeAwayy</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium mb-4">
          Hostel Management System
        </p>
        <p className="text-base text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
          A centralized platform to manage student records, room allocations, fee tracking,
          staff operations, complaints &amp; maintenance — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/login"
            className="px-7 py-3.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-150 text-sm"
          >
            Login to Dashboard →
          </Link>
          <Link
            to="/register"
            className="px-7 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 text-sm"
          >
            Register Student
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl mx-auto">
          {[
            { label: "Total Rooms", value: "240+" },
            { label: "Students Enrolled", value: "1,800+" },
            { label: "Staff Members", value: "45+" },
            { label: "Modules", value: "6" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-indigo-100 hover:bg-indigo-50/40 transition-all duration-200"
            >
              <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-slate-300">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
