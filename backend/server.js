const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const client = require("prom-client");   // 👈 ADD THIS

const app = express();

/* ---------------- PROMETHEUS SETUP ---------------- */

// Collect default Node.js metrics
client.collectDefaultMetrics();

// Custom metric: HTTP request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
  });
  next();
});

/* ---------------- SECURITY + MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

/* ---------------- DATABASE ---------------- */

mongoose.connect("mongodb://mongo:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

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

/* ---------------- METRICS ENDPOINT (IMPORTANT) ---------------- */

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

/* ---------------- SERVER ---------------- */

app.listen(5000, () => console.log("Backend running on 5000"));
