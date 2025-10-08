// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById("contactForm");
const feedbackForm = document.getElementById("feedbackForm");
const statusMessages = document.getElementById("statusMessages");
const apiResults = document.getElementById("apiResults");
const ratingSlider = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeForms();
  setupEventListeners();
});

function initializeForms() {
  // Update rating display
  ratingSlider.addEventListener("input", () => {
    ratingValue.textContent = ratingSlider.value;
  });
}

function setupEventListeners() {
  // Contact form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitContactForm();
  });

  // Feedback form submission
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitFeedbackForm();
  });

  // TODO: เพิ่ม real-time validation สำหรับ input fields
  // ใช้ addEventListener กับ 'input' event

  ["name", "email", "phone", "company", "subject", "message"].forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", () => {
        const result = validateField(id, input.value);
        input.classList.toggle("invalid", !result.isValid);
        input.classList.toggle("valid", result.isValid);
        const errorDiv = document.getElementById(id + "Error");
        if (errorDiv) errorDiv.textContent = result.message;
      });
    }
  });
}

// TODO: สร้างฟังก์ชัน validateField สำหรับ client-side validation
function validateField(fieldName, value) {
  let result = { isValid: true, message: "" };
  switch (fieldName) {
    case "name":
      if (!value || value.trim().length < 2) {
        result.isValid = false;
        result.message = "ต้องมีอย่างน้อย 2 ตัวอักษร";
      }
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        result.isValid = false;
        result.message = "อีเมลไม่ถูกต้อง";
      }
      break;
    case "phone":
      if (value && !/^[0-9]{9,10}$/.test(value)) {
        result.isValid = false;
        result.message = "เบอร์โทร 9-10 ตัวเลข";
      }
      break;
    case "subject":
      if (!value || value.trim().length < 5) {
        result.isValid = false;
        result.message = "ต้องมีอย่างน้อย 5 ตัวอักษร";
      }
      break;
    case "message":
      if (!value || value.trim().length < 10) {
        result.isValid = false;
        result.message = "ต้องมีอย่างน้อย 10 ตัวอักษร";
      }
      break;
  }
  return result;
}

async function submitContactForm() {
  if (isSubmitting) return;

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  try {
    isSubmitting = true;
    updateSubmitButton("contactSubmit", "กำลังส่ง...", true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      showStatusMessage(
        "✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว",
        "success"
      );
      contactForm.reset();
    } else {
      showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, "error");
      if (result.errors) {
        displayValidationErrors(result.errors);
      }
    }
  } catch (error) {
    showStatusMessage("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
    console.error("Error:", error);
  } finally {
    isSubmitting = false;
    updateSubmitButton("contactSubmit", "ส่งข้อความ", false);
  }
}

async function submitFeedbackForm() {
  if (isSubmitting) return;

  const formData = new FormData(feedbackForm);
  const data = Object.fromEntries(formData.entries());
  data.rating = parseInt(data.rating);

  try {
    isSubmitting = true;
    updateSubmitButton("feedbackSubmit", "กำลังส่ง...", true);

    // TODO: ส่งข้อมูลไปยัง /api/feedback endpoint
    // ใช้ fetch API
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // TODO: จัดการ response และแสดงผลลัพธ์
    const result = await response.json();
    if (result.success) {
      showStatusMessage("✅ ส่งความคิดเห็นสำเร็จ!", "success");
      feedbackForm.reset();
      ratingValue.textContent = "3";
    } else {
      showStatusMessage(`❌ ${result.message}`, "error");
      if (result.errors)
        result.errors.forEach((err) => showStatusMessage(err, "error"));
    }
  } catch (error) {
    showStatusMessage("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
    console.error("Error:", error);
  } finally {
    isSubmitting = false;
    updateSubmitButton("feedbackSubmit", "ส่งความคิดเห็น", false);
  }
}

function showStatusMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `status-message ${type}`;
  messageDiv.textContent = message;

  statusMessages.appendChild(messageDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
  const button = document.getElementById(buttonId);
  button.textContent = text;
  button.disabled = disabled;
}

function displayValidationErrors(errors) {
  errors.forEach((error) => {
    showStatusMessage(`🔸 ${error}`, "error");
  });
}

// API Testing Functions
async function loadContacts() {
  try {
    // TODO: เรียก GET /api/contact และแสดงผลลัพธ์
    const response = await fetch("/api/contact");
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading contacts: " + error.message;
  }
}

async function loadFeedbackStats() {
  try {
    // TODO: เรียก GET /api/feedback/stats และแสดงผลลัพธ์
    const response = await fetch("/api/feedback/stats");
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading feedback stats: " + error.message;
  }
}

async function loadAPIStatus() {
  try {
    // TODO: เรียก GET /api/status และแสดงผลลัพธ์
    const response = await fetch("/api/status");
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading API status: " + error.message;
  }
}

async function loadAPIDocs() {
  try {
    const response = await fetch("/api/docs");
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading API docs: " + error.message;
  }
}
