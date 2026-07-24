const facilities = [
  {
    icon: "🛏️",
    title: "Furnished Rooms",
    desc: "Comfortable single and double-occupancy rooms with beds, wardrobes, and study tables.",
  },
  {
    icon: "📶",
    title: "High-Speed Wi-Fi",
    desc: "24/7 high-speed internet connectivity across all blocks and common areas.",
  },
  {
    icon: "🍽️",
    title: "Mess & Cafeteria",
    desc: "Nutritious, hygienic meals served three times daily with special dietary options.",
  },
  {
    icon: "🏋️",
    title: "Fitness Centre",
    desc: "Fully equipped gymnasium with modern equipment for health and wellness.",
  },
  {
    icon: "🏥",
    title: "Medical Support",
    desc: "On-campus nurse and doctor visits available for emergency medical assistance.",
  },
  {
    icon: "🚿",
    title: "Modern Washrooms",
    desc: "Clean, well-maintained washrooms with hot water facilities available daily.",
  },
  {
    icon: "🔒",
    title: "24/7 Security",
    desc: "Round-the-clock security staff and CCTV surveillance for resident safety.",
  },
  {
    icon: "📚",
    title: "Study Lounge",
    desc: "Dedicated quiet reading rooms and collaborative study lounges for focused learning.",
  },
];

export default function Facilities() {
  return (
    <section id="facilities" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wide">
            World-Class Facilities
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 text-center mb-4 leading-tight">
          Everything You Need,{" "}
          <span className="text-indigo-600">Under One Roof</span>
        </h2>
        <p className="text-slate-500 text-center max-w-xl mx-auto mb-16 text-lg">
          Our hostel provides premium amenities to ensure students thrive both academically and personally.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="group bg-slate-50 border border-slate-100 rounded-xl p-6 hover:border-indigo-100 hover:bg-indigo-50/30 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-slate-800 font-semibold mb-2 group-hover:text-indigo-700 transition-colors duration-150">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
