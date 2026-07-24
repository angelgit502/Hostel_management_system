import { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "../api";
import StudentCard from "./StudentCard";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch all students on mount (useEffect + Axios GET)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await getStudents();
        setStudents(res.data);
        setError("");
      } catch {
        setError("Could not load students. Please ensure JSON Server is running on port 3001.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Axios DELETE handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this student?")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete student. Please try again.");
    }
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            Registered{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Students
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {students.length} student{students.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, course, dept…"
            className="pl-9 pr-4 py-2.5 bg-slate-800/70 border border-slate-700/60 text-white placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 w-64"
          />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <svg className="animate-spin w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-slate-400 text-sm">Fetching students from server…</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <p className="text-red-400 text-4xl mb-3">⚠️</p>
          <p className="text-red-300 font-semibold mb-1">Server Error</p>
          <p className="text-slate-400 text-sm">{error}</p>
          <p className="text-slate-500 text-xs mt-3 font-mono">npx json-server db.json --port 3001</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-12 text-center">
          <p className="text-5xl mb-4">🎓</p>
          <p className="text-white font-bold mb-1">
            {search ? "No students match your search" : "No students registered yet"}
          </p>
          <p className="text-slate-400 text-sm">
            {search ? "Try a different search term." : "Use the form above to register the first student."}
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
