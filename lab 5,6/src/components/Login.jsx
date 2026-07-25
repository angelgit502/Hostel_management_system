import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy credentials for each role
const CREDENTIALS = {
  admin: { email: "admin@hostel.com", password: "admin123" },
  staff: { email: "staff@hostel.com", password: "staff123" },
  student: { email: "student@hostel.com", password: "student123" },
};

const ROLE_ROUTES = {
  admin: "/admin",
  staff: "/staff",
  student: "/student",
};

const ROLE_META = {
  admin: {
    label: "Admin",
    icon: "🛡️",
    hint: "admin@hostel.com / admin123",
    hintBg: "bg-rose-50 border-rose-100 text-rose-700",
    btnClass: "bg-rose-600 hover:bg-rose-700",
    tabActive: "bg-rose-600 text-white shadow-sm",
  },
  staff: {
    label: "Staff",
    icon: "👔",
    hint: "staff@hostel.com / staff123",
    hintBg: "bg-violet-50 border-violet-100 text-violet-700",
    btnClass: "bg-violet-600 hover:bg-violet-700",
    tabActive: "bg-violet-600 text-white shadow-sm",
  },
  student: {
    label: "Student",
    icon: "🎓",
    hint: "student@hostel.com / student123",
    hintBg: "bg-indigo-50 border-indigo-100 text-indigo-700",
    btnClass: "bg-indigo-600 hover:bg-indigo-700",
    tabActive: "bg-indigo-600 text-white shadow-sm",
  },
};

export default function Login() {
  const [activeRole, setActiveRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const meta = ROLE_META[activeRole];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setFormData({ email: "", password: "" });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const creds = CREDENTIALS[activeRole];
    setTimeout(() => {
      if (
        formData.email === creds.email &&
        formData.password === creds.password
      ) {
        navigate(ROLE_ROUTES[activeRole]);
      } else {
        setError("Invalid email or password. Use the hint below.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to HomeAwayy</p>
        </div>

        {/* Role tabs */}
        <div className="flex bg-white border border-slate-200 rounded-xl p-1 mb-5 shadow-sm">
          {Object.keys(ROLE_META).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                activeRole === role
                  ? ROLE_META[role].tabActive
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {ROLE_META[role].icon} {ROLE_META[role].label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
          {/* Hint */}
          <div className={`${meta.hintBg} border rounded-lg px-4 py-3 mb-6 flex items-start gap-2`}>
            <span className="text-base mt-0.5">💡</span>
            <div>
              <p className="text-slate-700 text-xs font-semibold mb-0.5">{meta.label} Credentials</p>
              <p className="text-slate-500 text-xs font-mono">{meta.hint}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={`${activeRole}@hostel.com`}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-150 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-1.5" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-150 text-sm"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg px-4 py-3 text-rose-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${meta.btnClass} text-white font-semibold rounded-lg shadow-sm transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In…
                </span>
              ) : (
                `Sign In as ${meta.label}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
