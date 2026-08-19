import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-slate-100 flex flex-col">

      {/* Top Dark Blue Section */}
      <div className="h-24 w-full bg-blue-900"></div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">

        <div className="w-full min-h-[75vh] rounded-2xl bg-white px-10 py-12 flex flex-col items-center justify-center text-center shadow-xl">

          {/* Heading */}
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
            Student Management System
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Manage Student Registration
            <br />
            Simply
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Register students securely and view registered records using
            server-side and client-side rendering.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Register Student
            </Link>

            <Link
              href="/students"
              className="rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              View Registered Students
            </Link>

          </div>

        </div>

      </div>

      {/* Bottom Dark Blue Section */}
      <div className="h-16 w-full bg-blue-900"></div>

    </main>
  );
}