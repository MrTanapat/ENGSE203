// Contact form validation
const validateContact = (req, res, next) => {
  const { name, email, subject, message, phone, company } = req.body;
  const errors = [];

  // TODO: ตรวจสอบ name
  // - ต้องมีค่า
  // - ต้องเป็น string
  // - ความยาวอย่างน้อย 2 ตัวอักษร
  // - ไม่เกิน 100 ตัวอักษร
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 100
  ) {
    errors.push("ชื่อ-นามสกุลต้องมีความยาว 2-100 ตัวอักษร");
  }

  // TODO: ตรวจสอบ email
  // - ต้องมีค่า
  // - ต้องเป็น email format ที่ถูกต้อง
  // - ใช้ regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("อีเมลไม่ถูกต้อง");
  }

  // TODO: ตรวจสอบ subject
  // - ต้องมีค่า
  // - ความยาวอย่างน้อย 5 ตัวอักษร
  // - ไม่เกิน 200 ตัวอักษร
  if (!subject || subject.trim().length < 5 || subject.trim().length > 200) {
    errors.push("หัวเรื่องต้องมีความยาว 5-200 ตัวอักษร");
  }

  // TODO: ตรวจสอบ message
  // - ต้องมีค่า
  // - ความยาวอย่างน้อย 10 ตัวอักษร
  // - ไม่เกิน 1000 ตัวอักษร
  if (!message || message.trim().length < 10 || message.trim().length > 1000) {
    errors.push("ข้อความต้องมีความยาว 10-1000 ตัวอักษร");
  }

  // TODO: ตรวจสอบ phone (optional)
  // - ถ้ามีค่า ต้องเป็นเบอร์โทรที่ถูกต้อง
  // - ใช้ regex: /^[0-9]{9,10}$/
  if (phone && !/^[0-9]{9,10}$/.test(phone)) {
    errors.push("เบอร์โทรศัพท์ต้องมี 9-10 ตัวเลข");
  }

  // TODO: ตรวจสอบ company (optional)
  // - ถ้ามีค่า ต้องไม่เกิน 100 ตัวอักษร
  if (company && company.length > 100) {
    errors.push("ชื่อบริษัทต้องไม่เกิน 100 ตัวอักษร");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  // Sanitize data
  req.body.name = req.body.name.trim();
  req.body.email = req.body.email.trim().toLowerCase();
  req.body.subject = req.body.subject.trim();
  req.body.message = req.body.message.trim();

  next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
  const { rating, comment, email } = req.body;
  const errors = [];

  // TODO: ตรวจสอบ rating
  // - ต้องมีค่า
  // - ต้องเป็นตัวเลข 1-5
  if (rating === undefined || isNaN(rating) || rating < 1 || rating > 5) {
    errors.push("คะแนนต้องเป็นตัวเลข 1-5");
  }

  // TODO: ตรวจสอบ comment
  // - ต้องมีค่า
  // - ความยาวอย่างน้อย 5 ตัวอักษร
  // - ไม่เกิน 500 ตัวอักษร
  if (!comment || comment.trim().length < 5 || comment.trim().length > 500) {
    errors.push("ความคิดเห็นต้องมีความยาว 5-500 ตัวอักษร");
  }

  // TODO: ตรวจสอบ email (optional)
  // - ถ้ามีค่า ต้องเป็น email format ที่ถูกต้อง
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("อีเมลไม่ถูกต้อง");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  if (email) req.body.email = email.trim().toLowerCase();
  req.body.comment = comment.trim();

  next();
};

module.exports = {
  validateContact,
  validateFeedback,
};
