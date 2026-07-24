import { Link } from "react-router-dom";

const modules = [
  {
    icon: "🎓",
    title: "Student Management",
    desc: "Register students, manage profiles, track enrollment, and view student records in real-time.",
    status: "live",
    link: "/register",
    accent: "bg-indigo-50 border-indigo-100 text-indigo-600",
    btnClass: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
  {
    icon: "👔",
    title: "Staff Management",
    desc: "Manage hostel staff, assign roles, track shifts, and maintain staff records efficiently.",
    status: "coming-soon",
    accent: "bg-violet-50 border-violet-100 text-violet-600",
  },
  {
    icon: "🏠",
    title: "Room Management",
    desc: "View and configure room details, occupancy status, block assignments, and room types.",
    status: "coming-soon",
    accent: "bg-emerald-50 border-emerald-100 text-emerald-600",
  },
  {
    icon: "🗝️",
    title: "Room Allocation",
    desc: "Assign rooms to students, handle transfers, and manage waitlists with a smart allocation system.",
    status: "coming-soon",
    accent: "bg-amber-50 border-amber-100 text-amber-600",
  },
  {
    icon: "💰",
    title: "Fee Management",
    desc: "Track fee payments, generate receipts, send reminders, and monitor outstanding dues.",
    status: "coming-soon",
    accent: "bg-rose-50 border-rose-100 text-rose-600",
  },
  {
    icon: "🔧",
    title: "Complaint & Maintenance",
    desc: "Log maintenance requests, track resolution status, and manage hostel complaints seamlessly.",
    status: "coming-soon",
    accent: "bg-teal-50 border-teal-100 text-teal-600",
  },
];

export default function Modules() {
  return (
    <section id="modules" className="bg-slate-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wide">
            System Modules
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 text-center mb-4 leading-tight">
          Powerful{" "}
          <span className="text-indigo-600">Management Modules</span>
        </h2>
        <p className="text-slate-500 text-center max-w-xl mx-auto mb-16 text-lg">
          HostelPro is built with six core modules — fully functional Student Management is live today,
          with more modules launching soon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="relative group bg-white border border-slate-100 rounded-xl p-6 hover:border-slate-200 hover:shadow-md transition-all duration-200"
            >
              {/* Status badge */}
              {mod.status === "coming-soon" && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full border border-slate-200">
                  Coming Soon
                </span>
              )}
              {mod.status === "live" && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Live
                </span>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${mod.accent} border flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform duration-200`}>
                {mod.icon}
              </div>

              <h3 className="text-slate-800 font-bold text-base mb-2">{mod.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{mod.desc}</p>

              {mod.status === "live" ? (
                <Link
                  to={mod.link}
                  className={`inline-flex items-center gap-2 px-4 py-2 ${mod.btnClass} text-sm font-semibold rounded-lg transition-colors duration-150`}
                >
                  Open Module →
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 text-sm font-semibold rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
