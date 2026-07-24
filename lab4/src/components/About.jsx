const points = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Centralized Operations",
    desc: "Manage every hostel function from a single, unified dashboard — no more juggling spreadsheets.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Role-Based Access",
    desc: "Separate portals for Admins, Staff, and Students ensure the right people see the right information.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Scalable Architecture",
    desc: "Built with a modular approach so new features — fee payments, maintenance — can be added seamlessly.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-slate-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wide">
            About HostelPro
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 text-center mb-5 leading-tight">
          Smarter Hostel Management,{" "}
          <span className="text-indigo-600">Simplified</span>
        </h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          HostelPro automates and streamlines all hostel administrative operations — from student enrollment
          and room allocation to fee collection and complaint resolution — delivering efficiency at every step.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left – dashboard preview card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-slate-800 font-bold text-sm">HostelPro Dashboard</p>
                <p className="text-slate-500 text-xs">Management System v1.0</p>
              </div>
            </div>
            {[
              { label: "Students Registered", value: "1,847", color: "text-emerald-600" },
              { label: "Rooms Occupied", value: "214 / 240", color: "text-indigo-600" },
              { label: "Pending Fees", value: "₹ 3,24,000", color: "text-amber-600" },
              { label: "Open Complaints", value: "12", color: "text-rose-600" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                <span className="text-slate-500 text-sm">{item.label}</span>
                <span className={`font-bold text-sm ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Right – bullets */}
          <div className="flex flex-col gap-7">
            {points.map((p) => (
              <div key={p.title} className="flex gap-4 group">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-slate-800 font-bold mb-1">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
