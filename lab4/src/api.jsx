import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

// GET all students
export const getStudents = () => API.get("/students");

// POST a new student
export const addStudent = (studentData) => API.post("/students", studentData);

// DELETE a student by id
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export default API;
