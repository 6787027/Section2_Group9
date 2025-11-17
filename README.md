# Section2_Group9

## วิธีการตรวจงานเว็บไซต์ Celeste Craft

คู่มือลสำหรับการตั้งค่า (Setup) และรัน (Run) โปรเจกต์ Celeste Craft


### ข้อกำหนดเบื้องต้น

* Visual Studio Code
* Node.js (npm)
* dotenv
* MySQL Workbench
  

### 1. การตั้งค่าโปรเจกต์

1.  สร้าง Folder ใหม่ และดาวน์โหลดไฟล์ทั้งหมดลงใน Folder นั้น
2.  เปิด Visual Studio Code และใช้ "Open Folder..." เพื่อเปิด Folder ดังกล่าว



### 2. การติดตั้ง

ให้ผู้ตรวจเปิด Command Prompt Terminal 2 แท็บ สำหรับ Frontend และ Backend

1.  **ติดตั้ง Frontend:**
    * เปิด Terminal ใน VS Code
    * `cd` เข้าไปยังโฟลเดอร์ `sec2_gr9_fe_src`
    * รันคำสั่ง: `npm install`

2.  **ติดตั้ง Backend (Web Service):**
    * เปิด Terminal หน้าที่สอง
    * `cd` เข้าไปยังโฟลเดอร์ `sec2_gr9_ws_src`
    * รันคำสั่ง: `npm install`


### 3. การตั้งค่าฐานข้อมูล (Database Setup)

*(ผู้ตรวจสามารถทำขั้นตอนนี้ระหว่างรอ `npm install`)*

1.  เปิด MySQL Workbench
2.  คัดลอก Code ทั้งหมดจากไฟล์ `sec2_gr9_database.sql`
3.  นำไปวางใน Query Tab ของ MySQL Workbench แล้วกด Run (ไอคอนรูปสายฟ้าอันแรก)
4.  หลังจาก Run script เสร็จ ให้กดปุ่ม "Refresh" (Reset) ที่หน้า Schema เพื่อตรวจสอบว่ามีฐานข้อมูล `celestecraft` แสดงขึ้นมา
5.  **(แนะนำ)** สร้าง User ใหม่ใน MySQL โดยตั้งค่าดังนี้:
    * **Username:** `celestecraft`
    * **Password:** `ict555`


### 4. การตั้งค่า Environment (.env)

1.  ใน VS Code ให้ไปที่โฟลเดอร์ `sec2_gr9_ws_src`
2.  สร้างไฟล์ใหม่ชื่อ `.env`
3.  คัดลอกและวางเนื้อหาต่อไปนี้ลงในไฟล์ `.env`:

    ```env
    DB_host=localhost
    DB_username=celestecraft
    DB_password=ict555
    DB_name=celestecraft
    JWT_SECRET=your_super_random_and_secret_string_12345
    ```
> **หมายเหตุ:** หากคุณไม่ได้สร้าง User `celestecraft` คุณสามารถเปลี่ยน `DB_username` และ `DB_password` เป็น User ที่คุณมีในเครื่องได้


### 5. การรันโปรเจกต์ 

1.  **รัน Backend:**
    * ในหน้า Terminal ที่อยู่ใน `sec2_gr9_ws_src`
    * รันคำสั่ง: `npm start`

2.  **รัน Frontend:**
    * ในหน้า Terminal ที่อยู่ใน `sec2_gr9_fe_src`
    * รันคำสั่ง: `npm run dev`

3.  รอสักครู่ Terminal ฝั่ง Frontend **จะแสดงลิงก์ http://localhost:3000` ให้คลิกเพื่อเปิดเว็บไซต์


### 6. บัญชีสำหรับทดสอบ

ผู้ตรวจสามารถใช้บัญชีด้านล่างเพื่อเข้าสู่ระบบและตรวจสอบหน้าต่าง ๆ ได้

**User:**
* **user:** `usertest@gmail.com`
* **pass:** `maibok`

**Admin:**
* **user:** `admintest@gmail.com`
* **pass:** `Admin123`
