"use client";

import { useEffect, useState } from "react";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
}

export default function ClientStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch("/api/students");

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        setStudents(data);
      } catch (error) {
        console.error(error);
        setError("Could not load students.");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        Loading students...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-100 p-6 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow">
        No students found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {students.map((student) => (

        <div
          key={student._id}
          className="rounded-2xl bg-white p-6 shadow-md"
        >

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            {student.name}
          </h3>

          <p className="mt-3 text-sm text-slate-600">
            <b>Email:</b> {student.email}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            <b>Phone:</b> {student.phone}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            <b>Course:</b> {student.course}
          </p>

        </div>

      ))}

    </div>
  );
}