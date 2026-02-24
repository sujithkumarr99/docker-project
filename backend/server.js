const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Connect to MongoDB container
mongoose.connect("mongodb://mongo:27017/studentDB");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  year: Number
});

const Student = mongoose.model("Student", StudentSchema);

/* ---------------- CRUD OPERATIONS ---------------- */

// CREATE
app.post("/api/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// READ ALL
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// READ ONE
app.get("/api/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

// UPDATE
app.put("/api/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
app.delete("/api/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});

app.listen(5000, () => console.log("Backend running on 5000"));
