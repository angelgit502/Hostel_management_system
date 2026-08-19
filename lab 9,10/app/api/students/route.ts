import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

// GET - Fetch all students
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(students);
  } catch (error) {
    console.error("GET error:", error);

    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST - Register a student
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, course } = body;

    // Check required fields
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return NextResponse.json(
        { message: "A student with this email already exists" },
        { status: 400 }
      );
    }

    // Create student
    const student = await Student.create({
      name,
      email,
      phone,
      course,
    });

    return NextResponse.json(student, {
      status: 201,
    });
  } catch (error) {
    console.error("POST error:", error);

    return NextResponse.json(
      { message: "Failed to register student" },
      { status: 500 }
    );
  }
}