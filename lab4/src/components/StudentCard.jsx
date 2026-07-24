// StudentCard receives student data and onDelete via props
export default function StudentCard({ student, onDelete }) {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const genderColor =
    student.gender === "Female"
      ? "from-pink-500 to-rose-500"
      : student.gender === "Male"
      ? "from-blue-500 to-cyan-500"
      : "from-purple-500 to-violet-500";

  return (
    <div className="group bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 hover:border-blue-500/40 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${genderColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold truncate group-hover:text-blue-300 transition-colors duration-200">
            {student.name}
          </h3>
          <p className="text-slate-400 text-xs">
            {student.course} • {student.department}
          </p>
        </div>
        {/* Room badge */}
        <span className="flex-shrink-0 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono rounded-lg">
          {student.roomNumber}
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {[
          { label: "Age", value: student.age, icon: "🎂" },
          { label: "Gender", value: student.gender, icon: "👤" },
          { label: "Phone", value: student.phone, icon: "📞" },
          { label: "Email", value: student.email, icon: "✉️" },
        ].map((item) => (
          <div key={item.label} className="bg-slate-900/50 rounded-xl p-2.5">
            <p className="text-slate-500 text-xs mb-0.5">
              {item.icon} {item.label}
            </p>
            <p className="text-slate-200 text-xs font-medium truncate">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(student.id)}
        className="w-full py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Student
      </button>
    </div>
  );
}
