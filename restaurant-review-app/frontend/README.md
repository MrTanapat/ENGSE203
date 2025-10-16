#### ทดสอบ Frontend

**Test Case 1: แสดงรายการร้าน**
1. เปิด http://localhost:5173
2. ควรเห็นร้านอาหาร 10 ร้าน
3. แต่ละการ์ดมีรูป ชื่อ หมวด คำอธิบาย rating
<img width="400" height="755" alt="image" src="https://github.com/user-attachments/assets/00f5234e-4da1-4176-a643-62553f64dfa1" />


**Test Case 2: ค้นหา**
1. พิมพ์ "ส้มตำ" ในช่องค้นหา
2. รอ 0.5 วินาที (debounce)
3. ควรเห็นแค่ "ส้มตำน้าเข้านอ้ง"
<img width="1200" height="800" alt="image" src="https://github.com/user-attachments/assets/0a873ae7-96f4-4e08-b0e8-0610cb454045" />


**Test Case 3: กรองหมวด**
1. เลือก "อาหารไทย"
2. ควรเห็นร้านที่เป็นอาหารไทยเท่านั้น
<img width="1200" height="800" alt="image" src="https://github.com/user-attachments/assets/3b119765-19bf-4281-be3d-50e178ccb1b9" />


**Test Case 4: ดูรายละเอียด**
1. คลิกที่การ์ดร้านใดก็ได้
2. ควรเห็นหน้ารายละเอียด พร้อมรูปใหญ่
3. มีปุ่ม "กลับ"
<img width="1200" height="800" alt="image" src="https://github.com/user-attachments/assets/3b5a01c6-4d07-4697-89a8-773a62504cbe" />


**Test Case 5: เพิ่มรีวิว**
1. ในหน้ารายละเอียด กรอกฟอร์มรีวิว
2. ชื่อ: "ผู้ทดสอบ"
3. คะแนน: 5 ดาว
4. ความคิดเห็น: "ทดสอบระบบ อร่อยมากครับ"
5. กด "ส่งรีวิว"
6. ควรเห็นรีวิวใหม่ปรากฏทันที
7. คะแนนเฉลี่ยควรอัพเดท
<img width="1200" height="800" alt="image" src="https://github.com/user-attachments/assets/286abb98-b11a-4fe0-bf92-55bfcfd24e3e" />


**Test Case 6: Validation**
1. พยายามส่งฟอร์มว่างเปล่า → ควรเห็น error
2. กรอกชื่อแค่ 1 ตัว → error
3. กรอกความคิดเห็นแค่ 5 ตัว → error
4. กรอกครบถ้วน → ส่งได้
<img width="1200" height="800" alt="image" src="https://github.com/user-attachments/assets/27eb625b-6fea-40f7-80d0-d8cd3cc589f1" />
