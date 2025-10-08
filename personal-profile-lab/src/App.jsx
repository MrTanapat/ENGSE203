import React from "react";
import ProfileCard from "./ProfileCard";

function App() {
  // ข้อมูลโปรไฟล์ตัวอย่าง
  const sampleProfile = {
    name: "ธนภัทร นุกูล",
    studentId: "67543210031-0",
    major: "วิศวกรรมซอฟต์แวร์",
    year: 3,
    age: 22,
    gpa: 3.75,
    email: "tanapat_nu67@rmutl.ac.th",
    hobbies: [
      "Hiking",
      "Running",
      "Photography",
      "Playing Games",
      "listening music",
    ],
    skills: ["JavaScript", "React.js", "HTML/CSS", "Python", "Git", "Node.js"],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/MrTanapat" },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/tan-tanapat-311942301/",
      },
      { platform: "Instagram", url: "https://instagram.com/yourusername" },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #f0f2f5 0%, #e8eaf6 100%)",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            color: "#333",
            fontSize: "32px",
            margin: "20px 0",
          }}
        >
          🎓 Personal Profile Card
        </h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          Lab 3.1 - ทำความรู้จักกับ React.js และ JSX
        </p>
      </div>

      <ProfileCard profile={sampleProfile} />
    </div>
  );
}

export default App;
