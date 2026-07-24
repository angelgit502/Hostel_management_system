import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Register Student", to: "/register" },
  { label: "Admin Dashboard", to: "/admin" },
  { label: "Contact Us", to: "/contact" },
];

const modules = [
  "Student Management",
  "Staff Management",
  "Room Management",
  "Room Allocation",
  "Fee Management",
  "Complaint & Maintenance",
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">HostelPro</p>
                <p className="text-slate-400 text-xs">Management System v1.0</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A centralized hostel management platform for educational institutions — managing students, rooms,
              fees, and complaints from a single dashboard.
            </p>
            <div className="flex gap-2 mt-5">
              {["📘", "📸", "🐦", "💼"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 text-sm hover:bg-slate-700 transition-colors duration-150 flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-slate-400 text-sm hover:text-indigo-400 transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <span className="text-indigo-500 text-xs">›</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Modules</h3>
            <ul className="flex flex-col gap-2.5">
              {modules.map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-indigo-500 text-xs">›</span>
                  {m}
                  {m === "Student Management" && (
                    <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30 leading-none">
                      Live
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2024 HostelPro Management System. Built with React + Vite + Tailwind CSS.
          </p>
          <p className="text-slate-600 text-xs">
            College Project — Full Stack Development Lab
          </p>
        </div>
      </div>
    </footer>
  );
}
