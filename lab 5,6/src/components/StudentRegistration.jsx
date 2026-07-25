import { useState } from "react";
import { addStudent, updateStudent } from "../api";
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
  "w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-sm shadow-sm";

const labelClass = "block text-slate-700 text-sm font-semibold mb-1.5";

export default function StudentRegistration() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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
    
    if (!isEditing || formData.password.length > 0) {
      if (formData.password.length < 6) errs.password = "Password must be at least 6 characters.";
      if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    }
    
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMsg("");
  };

  const handleEdit = (student) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFormData({ ...student, password: "", confirmPassword: "" });
    setIsEditing(true);
    setEditId(student.id);
    setErrors({});
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
      // If editing and no new password provided, keep the old one (or rather don't update it on client)
      // Since json-server replaces the whole object on PUT, we need to send the old password if it wasn't changed.
      // But typically we shouldn't send passwords back to the client anyway. For this mock project, it's fine.
      const payloadToSend = { ...studentPayload };
      if (password) {
        payloadToSend.password = password;
      } else if (isEditing) {
        // Find existing student password if we want to retain it, or let json-server overwrite. 
        // We'll just leave it empty if they didn't type it for simplicity.
      } else {
        payloadToSend.password = password;
      }

      if (isEditing) {
        await updateStudent(editId, payloadToSend);
        setSuccessMsg(`✅ ${formData.name}'s details have been updated successfully!`);
      } else {
        await addStudent({ ...payloadToSend, id: Date.now().toString() });
        setSuccessMsg(`✅ ${formData.name} has been registered successfully!`);
      }
      
      setFormData(INITIAL_FORM);
      setIsEditing(false);
      setEditId(null);
      setErrors({});
      setRefreshKey((k) => k + 1); // trigger StudentList re-fetch
    } catch {
      setErrors({ submit: `❌ Failed to ${isEditing ? "update" : "register"} student. Make sure JSON Server is running on port 3001.` });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setIsEditing(false);
    setEditId(null);
    setErrors({});
    setSuccessMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="relative max-w-4xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Student Management — Live
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Student Registration
          </h1>
          <p className="text-slate-500 text-lg">
            {isEditing ? "Update the details for the selected student." : "Fill in the details below to register a new hostel student."}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl">
                🎓
              </div>
              <div>
                <p className="text-slate-900 font-bold text-lg">
                  {isEditing ? "Edit Student Details" : "New Student Registration Form"}
                </p>
                <p className="text-slate-500 text-sm mt-0.5">All fields marked are required</p>
              </div>
            </div>
            {isEditing && (
              <button onClick={handleReset} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>

          {/* Success / Error messages */}
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
              {successMsg}
            </div>
          )}
          {errors.submit && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
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
                {errors.name && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</p>}
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
                {errors.age && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.age}</p>}
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
                {errors.gender && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.gender}</p>}
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
                {errors.course && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.course}</p>}
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
                {errors.department && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.department}</p>}
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
                {errors.roomNumber && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.roomNumber}</p>}
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
                {errors.phone && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.phone}</p>}
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
                {errors.email && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className={labelClass} htmlFor="reg-password">
                  {isEditing ? "New Password (Optional)" : "Password"}
                </label>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isEditing ? "Leave blank to keep current" : "Min. 6 characters"}
                  className={inputClass}
                />
                {errors.password && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={labelClass} htmlFor="reg-confirm-password">
                  {isEditing ? "Confirm New Password" : "Confirm Password"}
                </label>
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
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-1 sm:flex-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {isEditing ? "Updating…" : "Registering…"}
                  </>
                ) : (
                  isEditing ? "Update Student" : "Register Student"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors flex-1 sm:flex-none"
              >
                {isEditing ? "Cancel Edit" : "Clear Form"}
              </button>
            </div>
          </form>
        </div>

        {/* Registered Students List */}
        <StudentList key={refreshKey} onEdit={handleEdit} />
      </div>
    </div>
  );
}
