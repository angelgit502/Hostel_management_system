import Link from "next/link";
import ClientStudents from "@/components/ClientStudents";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
	let students: Array<{
		_id: string;
		name: string;
		email: string;
		phone: string;
		course: string;
	}> = [];
	let errorMessage = "";

	try {
		await connectDB();

		const records = await Student.find().sort({ createdAt: -1 }).lean();

		students = records.map((student) => ({
			_id: student._id.toString(),
			name: student.name,
			email: student.email,
			phone: student.phone,
			course: student.course,
		}));
	} catch (error) {
		console.error("SSR error:", error);
		errorMessage = "Could not load students from MongoDB.";
	}

	return (
		<main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-10 text-center">
					<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
						Student Management System
					</p>
					<h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
						Registered Students
					</h1>
					<nav className="mt-5 flex justify-center gap-3">
						<Link
							href="/"
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
						>
							Home
						</Link>
						<a
							href="/register"
							className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
						>
							Register Student
						</a>
					</nav>
				</header>

				<section aria-labelledby="ssr-heading" className="mb-12">
					<h2 id="ssr-heading" className="mb-5 text-2xl font-bold text-slate-900">
						Server-Side Rendering
					</h2>
					{errorMessage ? (
						<div className="rounded-2xl bg-red-100 p-6 text-center text-red-700">
							{errorMessage}
						</div>
					) : students.length === 0 ? (
						<div className="rounded-2xl bg-white p-10 text-center shadow">
							No students found.
						</div>
					) : (
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{students.map((student) => (
								<article key={student._id} className="rounded-2xl bg-white p-6 shadow-md">
									<h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
									<p className="mt-3 text-sm text-slate-600">Email: {student.email}</p>
									<p className="mt-2 text-sm text-slate-600">Phone: {student.phone}</p>
									<p className="mt-2 text-sm text-slate-600">Course: {student.course}</p>
								</article>
							))}
						</div>
					)}
				</section>

				<section aria-labelledby="csr-heading">
					<h2 id="csr-heading" className="mb-5 text-2xl font-bold text-slate-900">
						Client-Side Rendering
					</h2>
					<ClientStudents />
				</section>
			</div>
		</main>
	);
}
