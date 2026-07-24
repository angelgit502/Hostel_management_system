import { useState } from "react";
import { addStudent } from "../api";
import StudentList from "./StudentList";

const INITIAL_FORM = {
  name: "",
  age: "",
  gender: "",
  course: "",
  department: "",
  roomNumber: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const inputClass =
  "w-full px-4 py-3 bg-slate-900/70 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm";

const labelClass = "block text-slate-300 text-sm font-medium mb-1.5";

export default function StudentRegistration() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Student name is required.";
    if (!formData.age || formData.age < 15 || formData.age > 60) errs.age = "Enter a valid age (15–60).";
    if (!formData.gender) errs.gender = "Please select a gender.";
    if (!formData.course.trim()) errs.course = "Course is required.";
    if (!formData.department.trim()) errs.department = "Department is required.";
    if (!formData.roomNumber.trim()) errs.roomNumber = "Room Number is required.";
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = "Enter a valid 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Enter a valid email address.";
    if (formData.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, password, ...studentPayload } = formData;
      await addStudent({ ...studentPayload, id: Date.now().toString() });
      setSuccessMsg(`✅ ${formData.name} has been registered successfully!`);
      setFormData(INITIAL_FORM);
      setErrors({});
      setRefreshKey((k) => k + 1); // trigger StudentList re-fetch
    } catch {
      setErrors({ submit: "❌ Failed to register student. Make sure JSON Server is running on port 3001." });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSuccessMsg("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-24 pb-16 px-4">
      {/* Background blobs */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium rounded-full mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Student Management — Live
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
            Student{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Registration
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Fill in the details below to register a new hostel student.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-8 shadow-2xl mb-12">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-700/50">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <p className="text-white font-bold">New Student Registration Form</p>
              <p className="text-slate-400 text-xs">All fields marked are required</p>
            </div>
          </div>

          {/* Success / Error messages */}
          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 mb-6 text-sm">
              {successMsg}
            </div>
          )}
          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Student Name */}
              <div>
                <label className={labelClass} htmlFor="reg-name">Student Name</label>
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Arjun Sharma"
                  className={inputClass}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Age */}
              <div>
                <label className={labelClass} htmlFor="reg-age">Age</label>
                <input
                  id="reg-age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                  min="15"
                  max="60"
                  className={inputClass}
                />
                {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass} htmlFor="reg-gender">Gender</label>
                <select
                  id="reg-gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
              </div>

              {/* Course */}
              <div>
                <label className={labelClass} htmlFor="reg-course">Course</label>
                <input
                  id="reg-course"
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech, B.Sc"
                  className={inputClass}
                />
                {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course}</p>}
              </div>

              {/* Department */}
              <div>
                <label className={labelClass} htmlFor="reg-department">Department</label>
                <input
                  id="reg-department"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className={inputClass}
                />
                {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
              </div>

              {/* Room Number */}
              <div>
                <label className={labelClass} htmlFor="reg-room">Room Number</label>
                <input
                  id="reg-room"
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="e.g. A-101"
                  className={inputClass}
                />
                {errors.roomNumber && <p className="text-red-400 text-xs mt-1">{errors.roomNumber}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass} htmlFor="reg-phone">Phone Number</label>
                <input
                  id="reg-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={inputClass}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass} htmlFor="reg-email">Email Address</label>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@college.edu"
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className={labelClass} htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={inputClass}
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={labelClass} htmlFor="reg-confirm-password">Confirm Password</label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={inputClass}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-700/50">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Registering…
                  </>
                ) : (
                  "Register Student"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 bg-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-600 hover:-translate-y-0.5 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Registered Students List */}
        <StudentList key={refreshKey} />
      </div>
    </div>
  );
}
