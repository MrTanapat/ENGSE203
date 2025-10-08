const express = require("express");
const router = express.Router();
const { validateContact } = require("../middleware/validation");
const { appendToJsonFile, readJsonFile } = require("../middleware/fileManager");

// POST /api/contact
router.post("/", validateContact, async (req, res) => {
  const saved = await appendToJsonFile("contacts.json", req.body);
  if (saved) {
    res.json({
      success: true,
      message: "Contact form submitted successfully",
      data: saved,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to save contact",
    });
  }
});

// GET /api/contact?page=1&limit=10
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const data = await readJsonFile("contacts.json");
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    success: true,
    page,
    limit,
    total: data.length,
    data: data.slice(start, end),
  });
});

module.exports = router;
