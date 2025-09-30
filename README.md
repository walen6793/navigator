
# Navigator

แอปตัวอย่างสำหรับ **การนำทาง (navigation)** บน React Native ด้วย Expo — โครงสร้างเรียบง่าย เหมาะเป็นสตาร์ทเตอร์โปรเจกต์/งานเรียน และต่อยอดใส่หน้าจอ/สแตกนาวิเกชันเพิ่มได้ง่าย

> โครงรีโปมีไฟล์หลัก: `App.js`, `index.js`, `app.json`, `package.json` และโฟลเดอร์ `assets/` (ภาษา JavaScript ทั้งโปรเจกต์).

## คุณสมบัติเด่น

* ⚡️ เริ่มโปรเจกต์ได้เร็วด้วย Expo (ไม่ต้องตั้งค่า native เริ่มต้น)
* 📱 รองรับรันบน Android, iOS และ Web (ผ่าน Expo)
* 🧭 โครงสร้างพร้อมต่อยอดใส่ React Navigation ได้ทันที
* 🗂️ โฟลเดอร์ `assets/` สำหรับรูป/ไอคอน

## เทคโนโลยี

* **Frontend/Mobile:** React Native (Expo)
* **Language:** JavaScript (100%) ([GitHub][1])

## ข้อกำหนดก่อนเริ่ม (Prerequisites)

* **Node.js** เวอร์ชัน LTS
* **npm** หรือ **yarn**
* **Expo CLI** (จะเรียกผ่าน `npx` ก็ได้)
* (ถ้าจะรัน emulator) **Android Studio/Xcode**

## เริ่มต้นแบบรวดเร็ว (Quick Start)

```bash
# 1) โคลนโปรเจกต์
git clone https://github.com/walen6793/navigator.git
cd navigator

# 2) ติดตั้งแพ็กเกจ
npm ci        # หรือ yarn install

# 3) รันโหมดพัฒนา (เลือกแพลตฟอร์ม)
npx expo start          # เปิด Dev Tools
# กด a เพื่อรัน Android emulator, i เพื่อรัน iOS simulator, w เพื่อรัน Web
```

> ถ้าใช้เครื่องจริง ให้ติดตั้งแอป **Expo Go** แล้วสแกน QR จากคอนโซล/หน้า Dev Tools



## โครงสร้างโฟลเดอร์


navigator/
├─ assets/            # รูป/ไอคอน/ฟอนต์
├─ App.js             # entry ของแอป (โค้ดหลัก)
├─ index.js           # จุดบูตแอป (บางเทมเพลตใช้)
├─ app.json           # Expo app config
├─ package.json       # สคริปต์และ dependencies
└─ README.md
```

## การใช้งาน React Navigation (แนะนำให้เพิ่ม)

ติดตั้งและตั้งต้น Stack Navigator:

```bash
npm i @react-navigation/native
npm i react-native-screens react-native-safe-area-context
npm i @react-navigation/native-stack
```


[1]: https://github.com/walen6793/navigator "GitHub - walen6793/navigator"
