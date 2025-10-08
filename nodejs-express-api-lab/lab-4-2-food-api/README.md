## API Endpoints

**ดูเมนูทั้งหมด :**
`GET http://localhost:3000/api/foods`

**ค้นหาด้วยคำว่า "ผัด" :**
`GET http://localhost:3000/api/foods?search=ผัด`

**กรองหมวด "แกง" :**
`GET http://localhost:3000/api/foods?category=แกง`

**อาหารมังสวิรัติ :**
`GET http://localhost:3000/api/foods?vegetarian=true`

**เมนู ID 1 :**
`GET http://localhost:3000/api/foods/1`

**อาหารแบบสุ่ม :**
`GET http://localhost:3000/api/foods/random`

**สถิติอาหาร :**
`GET http://localhost:3000/api/stats`

**Docs API :**
`GET http://localhost:3000/api/docs`

## 💻 Installation

1. Clone โปรเจกต์

```bash
git clone <repository-url>
cd lab-4-2-food-api
```

2. ติดตั้ง dependencies

```
npm install
```

3. รันเซิร์ฟเวอร์

```
node server.js
```
