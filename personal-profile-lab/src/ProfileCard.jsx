import React, { useState } from "react";
import "./ProfileCard.css";

function ProfileCard({ profile }) {
  // ฟังก์ชันสำหรับแสดง Avatar (ตัวอักษรแรกของชื่อ)
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Interactive Features
  const [viewCount, setViewCount] = useState(0);
  const [favoriteHobbies, setFavoriteHobbies] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleCardClick = () => {
    setViewCount(viewCount + 1);
  };

  const toggleFavoriteHobby = (hobby) => {
    if (favoriteHobbies.includes(hobby)) {
      setFavoriteHobbies(favoriteHobbies.filter((h) => h !== hobby));
    } else {
      setFavoriteHobbies([...favoriteHobbies, hobby]);
    }
  };

  const handleContactClick = () => {
    setShowContactForm(!showContactForm);
  };

  const handleSkillClick = (skill) => {
    alert(`${profile.name} มีความเชี่ยวชาญใน ${skill}!`);
  };

  // 🔥 Dark/Light Mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const cardClassName = `profile-card ${isDarkMode ? "dark-mode" : ""}`;

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      <div className="view-counter">👁️ Views: {viewCount}</div>

      {/* ส่วนหัว - รูปและชื่อ */}
      <div className="profile-header">
        <button
          className="toggle-theme"
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <div className="profile-avatar">{getInitials(profile.name)}</div>
        <h1 className="profile-name">{profile.name}</h1>
        <div className="student-id">{profile.studentId}</div>
      </div>

      {/* ข้อมูลพื้นฐาน */}
      <div className="profile-info">
        <div className="info-item">
          <div className="info-label">สาขา</div>
          <div className="info-value">{profile.major}</div>
        </div>
        <div className="info-item">
          <div className="info-label">ชั้นปี</div>
          <div className="info-value">{profile.year}</div>
        </div>
        <div className="info-item">
          <div className="info-label">อายุ</div>
          <div className="info-value">{profile.age} ปี</div>
        </div>
        <div className="info-item">
          <div className="info-label">เกรด</div>
          <div className="info-value">
            {profile.gpa.toFixed(2)}
            {profile.gpa >= 3.5 && " 🌟"}
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="profile-section">
        <h3>🏆 Achievements</h3>
        <div className="achievements">
          {profile.gpa >= 3.5 && (
            <span className="achievement-badge">🌟 เกียรตินิยม</span>
          )}
          {profile.skills.length >= 5 && (
            <span className="achievement-badge">💪 Multi-skilled</span>
          )}
        </div>
      </div>

      {/* งานอดิเรก */}
      <div className="profile-section">
        <h3>🎯 งานอดิเรก</h3>
        <ul className="hobbies-list">
          {profile.hobbies.map((hobby, index) => (
            <li
              key={index}
              className={`hobby-item ${
                favoriteHobbies.includes(hobby) ? "favorite" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavoriteHobby(hobby);
              }}
            >
              {hobby} {favoriteHobbies.includes(hobby) && "💖"}
            </li>
          ))}
        </ul>
      </div>

      {/* ทักษะ */}
      <div className="profile-section">
        <h3>💻 ทักษะ</h3>
        <div className="skills">
          {profile.skills.map((skill, index) => (
            <div
              key={index}
              className="skill-tag"
              onClick={(e) => {
                e.stopPropagation();
                handleSkillClick(skill);
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* 🌐 Social Links */}
      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <div className="profile-section">
          <h3>🌐 Social Media</h3>
          <div className="social-links">
            {profile.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                onClick={(e) => e.stopPropagation()}
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Contact Form */}
      {showContactForm && (
        <div className="contact-form" onClick={(e) => e.stopPropagation()}>
          <h3>📧 Contact {profile.name}</h3>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      {/* ปุ่ม Contact */}
      <button
        className="contact-button"
        onClick={(e) => {
          e.stopPropagation();
          handleContactClick();
        }}
      >
        📧 ติดต่อ {profile.name}
      </button>
    </div>
  );
}

export default ProfileCard;
