export default function StudentCard({ student, onDelete, onEdit }) {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const genderColor =
    student.gender === "Female"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : student.gender === "Male"
      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
      : "bg-violet-50 text-violet-700 border-violet-200";

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-lg flex-shrink-0 ${genderColor}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-900 font-bold truncate group-hover:text-indigo-600 transition-colors duration-200">
            {student.name}
          </h3>
          <p className="text-slate-500 text-xs">
            {student.course} • {student.department}
          </p>
        </div>
        {/* Room badge */}
        <span className="flex-shrink-0 px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-semibold rounded-lg">
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
          <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <p className="text-slate-400 text-xs mb-0.5">
              {item.icon} {item.label}
            </p>
            <p className="text-slate-700 text-xs font-medium truncate">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(student)}
          className="flex-1 py-2 bg-white border border-indigo-200 text-indigo-600 text-sm font-medium rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="flex-1 py-2 bg-white border border-rose-200 text-rose-600 text-sm font-medium rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}
