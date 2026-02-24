import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: ""
  });

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!form.name || !form.email || !form.department || !form.year) {
      alert("Fill all fields");
      return;
    }

    await axios.post(API, form);

    setForm({
      name: "",
      email: "",
      department: "",
      year: ""
    });

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="dashboard">
      
      {/* LEFT SIDE */}
      <div className="left-panel">
        <h2>Student Registration</h2>

        <input
          value={form.name}
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          value={form.email}
          placeholder="Email Address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          value={form.department}
          placeholder="Department"
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          value={form.year}
          placeholder="Year (1-4)"
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />

        <button onClick={addStudent}>Register Student</button>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-panel">
        <h2>📋 Registered Students</h2>

        {students.length === 0 && <p>No students registered yet.</p>}

        {students.map((s) => (
          <div key={s._id} className="student-card">
            <h3>{s.name}</h3>
            <p>{s.email}</p>
            <p>{s.department} | Year {s.year}</p>
            <button onClick={() => deleteStudent(s._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;