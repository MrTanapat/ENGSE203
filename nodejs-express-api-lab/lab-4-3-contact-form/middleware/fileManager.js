const fs = require("fs").promises;
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

// สร้างโฟลเดอร์ data ถ้าไม่มี
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch (error) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// อ่านข้อมูลจากไฟล์
const readJsonFile = async (filename) => {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// เขียนข้อมูลลงไฟล์
const writeJsonFile = async (filename, data) => {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing file:", error);
    return false;
  }
};

// เพิ่มข้อมูลใหม่ลงไฟล์
const appendToJsonFile = async (filename, newData) => {
  try {
    const existingData = await readJsonFile(filename);

    // TODO: เพิ่ม ID และ timestamp ให้ข้อมูลใหม่
    const dataWithId = {
      id: Date.now(),
      ...newData,
      createdAt: new Date().toISOString(),
    };

    existingData.push(dataWithId);
    await writeJsonFile(filename, existingData);
    return dataWithId;
  } catch (error) {
    console.error("Error appending to file:", error);
    return null;
  }
};

// TODO: สร้างฟังก์ชัน getFileStats
// ส่งกลับจำนวนข้อมูลในแต่ละไฟล์
const getFileStats = async () => {
  const files = ["contacts.json", "feedback.json"];
  const stats = {};
  for (const file of files) {
    const data = await readJsonFile(file);
    stats[file] = data.length;
  }
  return stats;
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  appendToJsonFile,
  // TODO: export getFileStats
  getFileStats,
};
