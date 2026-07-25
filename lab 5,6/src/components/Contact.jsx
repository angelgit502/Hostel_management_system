import { useState } from "react";

const contactInfo = [
  {
    icon: "📍",
    label: "Address",
    value: "HomeAwayy Campus, 12 College Road, Bengaluru – 560001, Karnataka, India",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "admin@homeawayy.edu.in",
  },
  {
    icon: "🕐",
    label: "Office Hours",
    value: "Mon – Sat: 8:00 AM – 6:00 PM",
  },
];

const inputClass =
  "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-150 text-sm";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
            📬 Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-3">
            Get in{" "}
            <span className="text-indigo-600">Touch</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Have a question or need assistance? Our hostel administration team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((c) => (
              <div
                key={c.label}
                className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex items-start gap-4 hover:border-indigo-100 transition-all duration-150"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  {c.icon}
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-0.5">{c.label}</p>
                  <p className="text-slate-700 text-sm">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">
                    Thank you for contacting us. Our team will reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-slate-800 font-bold text-lg mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-sm font-medium mb-1.5" htmlFor="contact-name">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Full name"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-sm font-medium mb-1.5" htmlFor="contact-email">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-medium mb-1.5" htmlFor="contact-subject">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Room allocation query"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-sm font-medium mb-1.5" htmlFor="contact-message">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your issue or query…"
                        rows={5}
                        required
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        "Send Message →"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
