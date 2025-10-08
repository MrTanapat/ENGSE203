const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const FOODS_FILE = path.join(__dirname, "../data/foods.json");

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
  try {
    const data = fs.readFileSync(FOODS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading foods:", error);
    return [];
  }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get("/", (req, res) => {
  try {
    let foods = loadFoods();

    // TODO: เพิ่ม query parameters สำหรับ filtering:
    // - search: ค้นหาจากชื่อหรือคำอธิบาย
    // - category: กรองตามประเภทอาหาร
    // - maxSpicy: กรองระดับความเผ็ดไม่เกินที่กำหนด
    // - vegetarian: กรองอาหารมังสวิรัติ (true/false)
    // - available: กรองอาหารที่พร้อมเสิร์ฟ (true/false)
    // - maxPrice: กรองราคาไม่เกินที่กำหนด

    const { search, category, maxSpicy, vegetarian, available, maxPrice } =
      req.query;

    // TODO: ทำ filtering logic ตาม query parameters
    if (search) {
      const keyword = search.toLowerCase();
      foods = foods.filter(
        (f) =>
          f.name.toLowerCase().includes(keyword) ||
          f.description.toLowerCase().includes(keyword)
      );
    }
    if (category) {
      foods = foods.filter(
        (f) => f.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (maxSpicy) {
      const level = parseInt(maxSpicy);
      foods = foods.filter((f) => f.spicyLevel <= level);
    }

    if (vegetarian !== undefined) {
      const veg = vegetarian === "true";
      foods = foods.filter((f) => f.vegetarian === veg);
    }

    if (available !== undefined) {
      const avail = available === "true";
      foods = foods.filter((f) => f.available === avail);
    }

    if (maxPrice) {
      const price = parseFloat(maxPrice);
      foods = foods.filter((f) => f.price <= price);
    }

    res.json({
      success: true,
      data: foods,
      total: foods.length,
      filters: {
        search: search || null,
        category: category || null,
        maxSpicy: maxSpicy || null,
        vegetarian: vegetarian || null,
        available: available || null,
        maxPrice: maxPrice || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching foods",
    });
  }
});

// TODO: GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get("/:id", (req, res) => {
  const foods = loadFoods();
  const id = parseInt(req.params.id);
  const food = foods.find((f) => f.id === id);
  if (food) {
    res.json({ success: true, data: food });
  } else {
    res.status(404).json({ success: false, message: "Food not found" });
  }
});

// TODO: GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get("/category/:category", (req, res) => {
  const foods = loadFoods();
  const category = req.params.category.toLowerCase();
  const filtered = foods.filter((f) => f.category.toLowerCase() === category);
  res.json({ success: true, total: filtered.length, data: filtered });
});

// TODO: GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get("/random", (req, res) => {
  const foods = loadFoods();
  if (foods.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No food available" });
  }
  const randomIndex = Math.floor(Math.random() * foods.length);
  res.json({ success: true, data: foods[randomIndex] });
});

module.exports = router;
