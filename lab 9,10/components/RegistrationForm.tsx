"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setMessage("Student registered successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white px-6 py-6 shadow-lg sm:px-7">

      <h2 className="text-xl font-bold text-slate-900">
        Student Registration
      </h2>

      <p className="mt-1 mb-4 text-xs text-slate-500">
        Enter your details to register as a student.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Course */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Course
          </label>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a course</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="BCom">BCom</option>
          </select>
        </div>

        {/* Register */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Registering..." : "Register Student"}
        </button>

      </form>

      {message && (
        <div className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-center text-xs font-medium text-slate-700">
          {message}
        </div>
      )}

    </div>
  );
}