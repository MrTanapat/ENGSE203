const express = require("express");
const app = express();
const PORT = 3001;

// TODO: สร้างข้อมูลจำลอง students array เดียวกับใน http-server.js
const students = [
  { id: 1, name: "Tanapat", major: "วิศวกรรม", year: 2 },
  { id: 2, name: "Nicha", major: "วิทยาการคอมพิวเตอร์", year: 3 },
  { id: 3, name: "Somchai", major: "วิศวกรรม", year: 1 },
];

// Middleware
app.use(express.json());

// TODO: Route GET /
// ส่งข้อความต้อนรับและรายการ endpoints
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Student API (Express)",
    endpoints: [
      "GET /students",
      "GET /students/:id",
      "GET /students/major/:major",
      "GET /stats",
    ],
  });
});

// TODO: Route GET /students
// ส่งรายการนักศึกษาทั้งหมด
app.get("/students", (req, res) => {
  res.json(students);
});

// TODO: Route GET /students/:id
// ส่งข้อมูลนักศึกษาตาม ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// TODO: Route GET /students/major/:major
// กรองนักศึกษาตามสาขา
app.get("/students/major/:major", (req, res) => {
  const major = req.params.major;
  const filtered = students.filter((s) => s.major === major);
  res.json(filtered);
});

// TODO: Route GET /stats
// ส่งสถิติ เช่น จำนวนนักศึกษาทั้งหมด, จำนวนแต่ละสาขา
app.get("/stats", (req, res) => {
  const total = students.length;
  const byMajor = students.reduce((acc, s) => {
    acc[s.major] = (acc[s.major] || 0) + 1;
    return acc;
  }, {});
  res.json({ total, byMajor });
});

// TODO: Middleware จัดการ 404
// ส่งข้อความ error ที่เหมาะสม
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("  GET /");
  console.log("  GET /students");
  console.log("  GET /students/:id");
  console.log("  GET /students/major/:major");
  console.log("  GET /stats");
});
