# Restaurant Review Website

## รายละเอียดโปรเจค
เว็บไซต์สำหรับค้นหาและรีวิวร้านอาหาร ผู้ใช้สามารถดูรายการร้าน, ค้นหา, กรอง, ดูรายละเอียดร้าน และเพิ่มรีวิวได้แบบเรียลไทม์

## เทคโนโลยีที่ใช้
- Frontend: React 18 + Vite
- Backend: Node.js + Express
- Database: JSON File Storage

## Features ที่ทำได้
### Required Features (70 คะแนน)
- [x] แสดงรายการร้านอาหาร
- [x] ค้นหาร้าน
- [x] กรองตามหมวด/rating/ราคา
- [x] ดูรายละเอียดร้าน
- [x] เพิ่มรีวิว
- [x] Validation
- [x] อัพเดท rating อัตโนมัติ

### Bonus Features (ถ้ามี)
- [x] Sort restaurants
- [x] Responsive design
- [ ] Animations

## วิธีติดตั้งและรัน

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- GET `/api/restaurants` - ดึงรายการร้านทั้งหมด
- GET `/api/restaurants/:id` - ดึงร้านตาม ID
- POST `/api/reviews` - เพิ่มรีวิว
- GET `/api/stats` - ดึงสถิติ

## Screenshots
### หน้าแรก
<img width="1200" height="800" alt="image" src="https://github.com/user-attachments/assets/94c06768-38f3-4a3d-9227-102fa014c052" />


### รายละเอียดร้าน
<img width="1200" height="420" alt="image" src="https://github.com/user-attachments/assets/fd0d1136-b6f4-4f2c-8a2d-f9cad63d6b69" />



### ฟอร์มรีวิว
<img width="1137" height="687" alt="image" src="https://github.com/user-attachments/assets/58c386c9-6fcf-44c9-8489-856afcda3d9f" />


## ผู้พัฒนา
- ชื่อ: ธนภัทร นุกูล
- รหัสนักศึกษา: 67543210031-0
- Email: tanapat_nu6@live.rmutl.ac.th

## License
MIT License
