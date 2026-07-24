import { Link } from "react-router-dom";

const notices = [
  { title: "Mess timings revised", date: "Jul 22", tag: "📢 Notice" },
  { title: "Fee payment deadline: Aug 5", date: "Jul 20", tag: "💰 Finance" },
  { title: "Fire drill on Jul 28 @ 10AM", date: "Jul 19", tag: "🔔 Safety" },
];

export default function StudentDashboard() {
  const student = {
    name: "Arjun Sharma",
    id: "HST-2024-001",
    course: "B.Tech (CSE)",
    room: "A-101",
    block: "Block A",
    joinDate: "June 2024",
    feeStatus: "Paid",
    nextDue: "August 2024",
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile header */}
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-sm flex-shrink-0">
            AS
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-slate-900">{student.name}</h1>
            <p className="text-indigo-600 text-sm">{student.id} • {student.course}</p>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-800 font-bold text-sm">{student.room}</p>
              <p className="text-slate-400 text-xs">Room</p>
            </div>
            <div className="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-800 font-bold text-sm">{student.block}</p>
              <p className="text-slate-400 text-xs">Block</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Details */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-slate-800 font-bold text-base mb-5">My Details</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Hostel ID", value: student.id },
                { label: "Course", value: student.course },
                { label: "Room", value: `${student.room} – ${student.block}` },
                { label: "Joined", value: student.joinDate },
                { label: "Fee Status", value: student.feeStatus },
                { label: "Next Due", value: student.nextDue },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-0.5">{item.label}</p>
                  <p className={`text-sm font-semibold ${item.label === "Fee Status" ? "text-emerald-600" : "text-slate-700"}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors"
              >
                📩 Raise Complaint
              </Link>
              <button className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed">
                💰 Pay Fees (Soon)
              </button>
            </div>
          </div>

          {/* Notices */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-slate-800 font-bold text-base mb-5">Hostel Notices</h2>
            <div className="flex flex-col gap-4">
              {notices.map((n, i) => (
                <div key={i} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="text-xs text-slate-400 font-medium">{n.tag}</span>
                  <p className="text-slate-700 text-sm font-medium mt-0.5">{n.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{n.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming soon notice */}
        <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-3">🚧</p>
          <p className="text-slate-800 font-bold mb-1">More Student Features — Coming Soon</p>
          <p className="text-slate-500 text-sm">Fee payments, maintenance requests, and leave applications will be available in future modules.</p>
        </div>
      </div>
    </div>
  );
}
