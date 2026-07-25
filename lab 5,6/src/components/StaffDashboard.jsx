const tasks = [
  { task: "Inspect Block A rooms", due: "Today", status: "Pending", priority: "High" },
  { task: "Update hostel registers", due: "Today", status: "In Progress", priority: "Medium" },
  { task: "Resolve complaint #0045", due: "Tomorrow", status: "Pending", priority: "High" },
  { task: "Conduct fire drill", due: "Fri", status: "Scheduled", priority: "Low" },
  { task: "Submit monthly report", due: "Sat", status: "Pending", priority: "Medium" },
];

const priorityColors = {
  High: "text-rose-700 bg-rose-50 border-rose-200",
  Medium: "text-amber-700 bg-amber-50 border-amber-200",
  Low: "text-emerald-700 bg-emerald-50 border-emerald-200",
};

const statusColors = {
  Pending: "text-slate-500 bg-slate-100 border-slate-200",
  "In Progress": "text-indigo-700 bg-indigo-50 border-indigo-200",
  Scheduled: "text-violet-700 bg-violet-50 border-violet-200",
};

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-2xl">
            👔
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Staff Dashboard</h1>
            <p className="text-slate-500 text-sm">Welcome back, Staff Member</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "My Block", value: "Block A", icon: "🏠" },
            { label: "Rooms Managed", value: "60", icon: "🗝️" },
            { label: "Open Complaints", value: "4", icon: "🔔" },
            { label: "Tasks Today", value: "3", icon: "📋" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tasks table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 shadow-sm">
          <h2 className="text-slate-800 font-bold text-base mb-5">My Tasks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-slate-500 font-medium pb-3 pr-4">Task</th>
                  <th className="text-left text-slate-500 font-medium pb-3 pr-4">Due</th>
                  <th className="text-left text-slate-500 font-medium pb-3 pr-4">Priority</th>
                  <th className="text-left text-slate-500 font-medium pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 pr-4 text-slate-700">{t.task}</td>
                    <td className="py-3 pr-4 text-slate-500">{t.due}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${priorityColors[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${statusColors[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coming soon notice */}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-3">🚧</p>
          <p className="text-slate-800 font-bold mb-1">Staff Management Module — Coming Soon</p>
          <p className="text-slate-500 text-sm">
            Full staff management with shift scheduling, attendance tracking, and role assignment will be available in the next release.
          </p>
        </div>
      </div>
    </div>
  );
}
