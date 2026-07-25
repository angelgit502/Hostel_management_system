import { Link } from "react-router-dom";

const modules = [
  {
    icon: "🎓",
    title: "Student Management",
    desc: "Register students, manage profiles, track enrollment, and view student records in real-time.",
    status: "active",
    link: "/register",
    accent: "bg-indigo-50 border-indigo-100 text-indigo-600",
    btnClass: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
  {
    icon: "👔",
    title: "Staff Management",
    desc: "Manage hostel staff, assign roles, track shifts, and maintain staff records efficiently.",
    status: "inactive",
    accent: "bg-slate-50 border-slate-100 text-slate-400",
  },
  {
    icon: "🏠",
    title: "Room Management",
    desc: "View and configure room details, occupancy status, block assignments, and room types.",
    status: "inactive",
    accent: "bg-slate-50 border-slate-100 text-slate-400",
  },
  {
    icon: "🗝️",
    title: "Room Allocation",
    desc: "Assign rooms to students, handle transfers, and manage waitlists with a smart allocation system.",
    status: "inactive",
    accent: "bg-slate-50 border-slate-100 text-slate-400",
  },
  {
    icon: "💰",
    title: "Fee Management",
    desc: "Track fee payments, generate receipts, send reminders, and monitor outstanding dues.",
    status: "inactive",
    accent: "bg-slate-50 border-slate-100 text-slate-400",
  },
  {
    icon: "🔧",
    title: "Complaint & Maintenance",
    desc: "Log maintenance requests, track resolution status, and manage hostel complaints seamlessly.",
    status: "inactive",
    accent: "bg-slate-50 border-slate-100 text-slate-400",
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
          HomeAwayy is built with six core modules — fully functional Student Management is live today,
          with more modules launching soon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className={`relative bg-white border border-slate-100 rounded-xl p-6 transition-all duration-200 ${
                mod.status === "active" ? "hover:border-slate-200 hover:shadow-md group" : "opacity-75 cursor-default"
              }`}
            >
              {/* Status badge */}
              {mod.status === "inactive" && (
                <span className="absolute top-4 right-4 px-2.5 py-1 text-slate-400 text-xs font-semibold rounded-full bg-slate-50 border border-slate-100">
                  inactive
                </span>
              )}
              {mod.status === "active" && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-200 flex items-center gap-1">
                  ✔ Active
                </span>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${mod.accent} border flex items-center justify-center text-2xl mb-4 ${mod.status === "active" ? "group-hover:scale-105 transition-transform duration-200" : ""}`}>
                {mod.icon}
              </div>

              <h3 className={`font-bold text-base mb-2 ${mod.status === "active" ? "text-slate-800" : "text-slate-500"}`}>{mod.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{mod.desc}</p>

              {mod.status === "active" && (
                <Link
                  to={mod.link}
                  className={`inline-flex items-center gap-2 px-4 py-2 ${mod.btnClass} text-sm font-semibold rounded-lg transition-colors duration-150`}
                >
                  Manage Students
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
