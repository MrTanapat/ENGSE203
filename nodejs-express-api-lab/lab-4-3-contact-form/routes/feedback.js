const express = require("express");
const router = express.Router();
const { validateFeedback } = require("../middleware/validation");
const { appendToJsonFile, readJsonFile } = require("../middleware/fileManager");

// POST /api/feedback
router.post("/", validateFeedback, async (req, res) => {
  const saved = await appendToJsonFile("feedback.json", req.body);
  if (saved) {
    res.json({
      success: true,
      message: "Feedback submitted successfully",
      data: saved,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to save feedback",
    });
  }
});

// GET /api/feedback/stats
router.get("/stats", async (req, res) => {
  const data = await readJsonFile("feedback.json");
  const total = data.length;
  const averageRating =
    total > 0
      ? (data.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(2)
      : 0;
  const ratingCount = [1, 2, 3, 4, 5].reduce((acc, r) => {
    acc[r] = data.filter((f) => f.rating === r).length;
    return acc;
  }, {});

  res.json({
    success: true,
    total,
    averageRating,
    ratingCount,
  });
});

module.exports = router;
