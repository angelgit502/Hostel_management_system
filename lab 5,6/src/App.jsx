import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages / Sections
import Hero from "./components/Hero";
import About from "./components/About";
import Facilities from "./components/Facilities";
import Modules from "./components/Modules";

// Standalone pages
import Login from "./components/Login";
import StudentRegistration from "./components/StudentRegistration";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Contact from "./components/Contact";

// Home page — composes all landing sections
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Facilities />
      <Modules />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
