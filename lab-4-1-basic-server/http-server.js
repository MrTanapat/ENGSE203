const http = require("http");
const url = require("url");

const PORT = 3000;

// TODO: สร้างข้อมูลจำลอง students array
// ควรมี id, name, major, year อย่างน้อย 3 คน
const students = [
  { id: 1, name: "Tanapat", major: "วิศวกรรม", year: 2 },
  { id: 2, name: "Nicha", major: "วิทยาการคอมพิวเตอร์", year: 3 },
  { id: 3, name: "Somchai", major: "วิศวกรรม", year: 1 },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // TODO: จัดการ route GET /
  // ส่งข้อความต้อนรับและรายการ endpoints ที่มี
  if (method === "GET" && pathname === "/") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "Welcome to Student API",
        endpoints: [
          "GET /students",
          "GET /students/:id",
          "GET /students/major/:major",
        ],
      })
    );
    return;
  }

  // TODO: จัดการ route GET /students
  // ส่งรายการนักศึกษาทั้งหมด
  if (method === "GET" && pathname === "/students") {
    res.writeHead(200);
    res.end(JSON.stringify(students));
    return;
  }

  // TODO: จัดการ route GET /students/:id
  // ส่งข้อมูลนักศึกษาตาม ID
  // ตัวอย่าง: /students/1
  if (method === "GET" && pathname.startsWith("/students/")) {
    const pathParts = pathname.split("/");
    if (pathParts[2] && !isNaN(pathParts[2])) {
      const id = parseInt(pathParts[2]);
      const student = students.find((s) => s.id === id);
      if (student) {
        res.writeHead(200);
        res.end(JSON.stringify(student));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Student not found" }));
      }
      return;
    }

    // TODO: จัดการ route GET /students/major/:major
    // กรองนักศึกษาตามสาขา
    // ตัวอย่าง: /students/major/วิศวกรรม
    if (
      pathParts[1] === "students" &&
      pathParts[2] === "major" &&
      pathParts[3]
    ) {
      const major = decodeURIComponent(pathParts[3]);
      const filtered = students.filter((s) => s.major === major);
      res.writeHead(200);
      res.end(JSON.stringify(filtered));
      return;
    }
  }

  // TODO: จัดการกรณี 404 Not Found
  // ส่ง status 404 และข้อความที่เหมาะสม
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("  GET /");
  console.log("  GET /students");
  console.log("  GET /students/:id");
  console.log("  GET /students/major/:major");
});
