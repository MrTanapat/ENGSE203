# Comparison: HTTP vs Express

## 1. HTTP Server (Node.js)

**ข้อดี**

- เบาและไม่ต้องติดตั้ง library เพิ่ม
- เข้าใจพื้นฐานการทำงานของ HTTP (request, response, headers)
- ควบคุมได้ละเอียดทุกขั้นตอน

**ข้อเสีย**

- ต้องเขียน routing เองทั้งหมด
- การจัดการ JSON, CORS, และ middleware ต้องทำเอง
- ขยายโปรเจกต์ใหญ่ ๆ จะซับซ้อน

**ตัวอย่างโค้ด**

```js
const http = require("http");
const server = http.createServer((req, res) => {
  // routing และ response
});
```
