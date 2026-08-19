import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">

      <div className="mx-auto flex max-w-3xl flex-col items-center">

        <header className="mb-5 text-center">

          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            Student Management System
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Student Registration
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Enter your details below to register as a student.
          </p>

        </header>

        <RegistrationForm />

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">

          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Back to Home
          </Link>

          <Link
            href="/students"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
          >
            View Registered Students
          </Link>

        </div>

      </div>

    </main>
  );
}