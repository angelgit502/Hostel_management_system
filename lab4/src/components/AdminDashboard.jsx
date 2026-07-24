import { Link } from "react-router-dom";

const stats = [
  { label: "Total Students", value: "1,847", icon: "🎓", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  { label: "Total Staff", value: "45", icon: "👔", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  { label: "Rooms Occupied", value: "214 / 240", icon: "🏠", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { label: "Pending Fees", value: "₹3,24,000", icon: "💰", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  { label: "Open Complaints", value: "12", icon: "🔔", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
  { label: "Modules Active", value: "1 / 6", icon: "⚡", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
];

const recentActivity = [
  { action: "New student registered", name: "Rohan Mehta", time: "2 min ago", icon: "🎓" },
  { action: "Room B-203 allocated", name: "Sneha Patel", time: "15 min ago", icon: "🏠" },
  { action: "Complaint #0048 raised", name: "Arjun Kumar", time: "1 hr ago", icon: "🔧" },
  { action: "Fee payment received", name: "Priya Nair", time: "3 hrs ago", icon: "💰" },
  { action: "Staff attendance marked", name: "Ramesh Kumar", time: "5 hrs ago", icon: "✅" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-xl border border-rose-200">
                🛡️
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-500 text-sm">Welcome back, Administrator</p>
              </div>
            </div>
          </div>
          <Link
            to="/register"
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            + Register Student
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-4 hover:-translate-y-0.5 transition-transform duration-200`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-slate-800 font-bold text-base mb-5">Recent Activity</h2>
            <div className="flex flex-col gap-4">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 text-sm font-medium">{a.action}</p>
                    <p className="text-slate-400 text-xs">{a.name}</p>
                  </div>
                  <span className="text-slate-400 text-xs flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modules status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-slate-800 font-bold text-base mb-5">Module Status</h2>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Student Management", status: "Live", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { name: "Staff Management", status: "Coming Soon", badge: "bg-slate-100 text-slate-500 border-slate-200" },
                { name: "Room Management", status: "Coming Soon", badge: "bg-slate-100 text-slate-500 border-slate-200" },
                { name: "Room Allocation", status: "Coming Soon", badge: "bg-slate-100 text-slate-500 border-slate-200" },
                { name: "Fee Management", status: "Coming Soon", badge: "bg-slate-100 text-slate-500 border-slate-200" },
                { name: "Complaint & Maintenance", status: "Coming Soon", badge: "bg-slate-100 text-slate-500 border-slate-200" },
              ].map((m) => (
                <div key={m.name} className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700 text-sm">{m.name}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${m.badge}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
