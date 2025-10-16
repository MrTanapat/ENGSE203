## การทดสอบ Backend
```bash
# 1. ทดสอบดูร้านทั้งหมด
curl http://localhost:3000/api/restaurants
```
<img width="1200" height="60" alt="image" src="https://github.com/user-attachments/assets/34c9a4de-c78d-4e10-ac52-bb09a17ba3d2" />

```bash
# 2. ทดสอบค้นหา
curl "http://localhost:3000/api/restaurants?search=ส้มตำ"
```
<img width="1200" height="90" alt="image" src="https://github.com/user-attachments/assets/8f045e58-b2d7-49c8-bd7f-84643d783c0d" />



```bash
# 3. ทดสอบกรองตามหมวด
curl "http://localhost:3000/api/restaurants?category=อาหารไทย"
```
<img width="1200" height="200" alt="image" src="https://github.com/user-attachments/assets/696698e3-cbf1-4427-ab53-8e8a6b7772b1" />



```bash
# 4. ทดสอบดูร้านตาม ID
curl http://localhost:3000/api/restaurants/1
```
<img width="1200" height="90" alt="image" src="https://github.com/user-attachments/assets/1e50d527-a37d-425f-8b9f-bffbd6b8b140" />

```bash
# 5. ทดสอบเพิ่มรีวิว (ควรสำเร็จ)
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": 1,
    "userName": "สมชาย ใจดี",
    "rating": 5,
    "comment": "อร่อยมากครับ บรรยากาศดี พนักงานบริการดีเยี่ยม แนะนำเลยครับ"
  }'
```
<img width="1200" height="200" alt="image" src="https://github.com/user-attachments/assets/bdb2ce04-5ba5-46d3-8d32-fa49a3bd661f" />



```bash
# 6. ทดสอบ validation (ควรได้ error)
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": 1,
    "userName": "A",
    "rating": 6,
    "comment": "สั้น"
  }'
```
<img width="1200" height="200" alt="image" src="https://github.com/user-attachments/assets/cc2d44d6-7bd4-428b-92dd-54cbcb994b18" />



```bash
# 7. ทดสอบดูสถิติ
curl http://localhost:3000/api/stats
```
<img width="1200" height="60" alt="image" src="https://github.com/user-attachments/assets/912aeedf-2e19-489f-89b1-dcbbd2c6b2d3" />
