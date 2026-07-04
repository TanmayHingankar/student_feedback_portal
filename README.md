# Student Feedback Portal

[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square)](#)
[![Vite](https://img.shields.io/badge/Vite-Dev%20Server-646CFF?style=flat-square)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38BDF8?style=flat-square)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square)](#)
[![Express](https://img.shields.io/badge/Express-API-10B981?style=flat-square)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-4DB33D?style=flat-square)](#)
[![MERN](https://img.shields.io/badge/MERN-Production-ready-brightgreen?style=flat-square)](#)

## 📌 Project Title
**Student Feedback Portal**

## 🧾 Project Description
Student Feedback Portal is an end-to-end MERN application that lets students submit event feedback and automatically generates a **high-quality PDF participation certificate**. After successful submission, the system:

1. Validates the form (frontend + backend)
2. Saves feedback to MongoDB
3. Generates a certificate PDF
4. Generates a QR code for verification
5. Emails the certificate to the student using Nodemailer
6. Shows a success page and allows certificate download/preview

An **admin panel** provides complete management features, including analytics, searching, sorting, filtering, pagination, resend certificate, and export capabilities.

---

## 🚀 Live Features

### 👨‍🎓 Student Module
- Enter Name
- Enter Email
- Select State
- Select College
- Select Department
- Select Year
- Mobile Number (10 digits)
- Gender
- Event Name
- Feedback Rating (1–10)
- Suggestions (max 500 chars)
- Submit feedback

After submission:
- Certificate generation (PDF)
- QR code generation
- Email delivery
- Success feedback
- Certificate download
- Redirect to Thank You page

### 🛡️ Admin Module
- Admin login (JWT protected)
- Dashboard cards:
  - Total Students
  - Total Certificates Sent
  - Average Feedback
  - Highest Rating
  - Lowest Rating
  - Today’s Feedback
  - Monthly Feedback
- Charts:
  - Feedback graph
  - State-wise
  - College-wise
  - Department-wise
- Student management:
  - Add/Edit/Delete
  - View details
  - Search
  - Sorting
  - Filtering
  - Pagination
- Certificate management:
  - Resend certificate
  - Print certificate
  - Export PDF
  - Export Excel/CSV
- Dark mode

---

## 📸 Screenshots (Placeholders)

001<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_32_45 PM" src="https://github.com/user-attachments/assets/f874f35e-dafd-4a03-9dab-1397318416d1" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_32_53 PM" src="https://github.com/user-attachments/assets/d560301d-77cd-4e93-b8e7-072291da80e3" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_33_00 PM" src="https://github.com/user-attachments/assets/445ed0e9-3b97-4c32-8ddb-673b0b67cafa" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_33_24 PM" src="https://github.com/user-attachments/assets/74198984-1c39-4817-99cc-6853d0d5710c" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_33_32 PM" src="https://github.com/user-attachments/assets/9fec8d6e-8f02-4126-bbd5-7d5222fd5f0c" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_32_22 PM" src="https://github.com/user-attachments/assets/77876c18-d8aa-4db2-b65e-f6909c7d66b6" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_32_31 PM" src="https://github.com/user-attachments/assets/61208acf-f7ac-4d8c-9495-545fdea2ddbc" />
<img width="1536" height="1024" alt="ChatGPT Image Jul 4, 2026, 09_32_38 PM" src="https://github.com/user-attachments/assets/d2bd9073-b877-4942-951b-b7a612a12e2d" />


---

## 🧰 Tech Stack

### Frontend
- React.js (Latest)
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- React Hot Toast
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT authentication
- bcrypt password hashing
- Helmet
- Rate limiting
- CORS
- Mongo Sanitization
- express-validator

### Certificate & Email
- PDF Certificate generation (PDFKit)
- QR Code (qrcode)
- Email delivery (Nodemailer)

---

## 📁 Folder Structure

```tree
student-feedback-portal/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── templates/
│   ├── certificates/
│   ├── uploads/
│   ├── package.json
│   └── server.js
├── docs/
├── README.md
├── .gitignore
├── docker-compose.yml
└── .env.example
```

---

## 🔐 Authentication Flow (JWT)

1. Admin logs in using email/password.
2. Server verifies credentials using bcrypt.
3. Server issues JWT signed with `JWT_SECRET`.
4. Admin routes require JWT.
5. Admin can access dashboard and protected resources.

---

## 🧾 Certificate Flow (PDF + QR)

1. Student submits feedback.
2. Backend validates input.
3. System generates `Certificate ID` in format like `CERT-YYYY-00001`.
4. QR code is generated containing:
   - Certificate ID
   - Student name
   - Verification URL
5. PDFKit generates a landscape PDF with:
   - Golden border
   - Watermark background
   - Certificate of Participation
   - Student name
   - Event name
   - Date
   - Signature block
   - QR code
6. PDF is saved and emailed.

---

## 📬 Email Flow (Nodemailer)

1. Backend creates an email using `templates/certificateEmail.js`.
2. Certificate PDF is attached.
3. Nodemailer sends via configured SMTP.
4. If resend is triggered, certificate is re-sent.

---

## 📎 QR Verification Flow

QR contains an encoded verification payload including:
- Certificate ID
- Student name
- `VERIFICATION_BASE_URL`

Frontend can open a verification page to display validity.

---

## 📚 API Documentation

### POST `/api/feedback`
- **Description:** Submit student feedback and generate/send certificate.

- **Request Body (JSON):**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "phone": "9876543210",
  "state": "Maharashtra",
  "college": "XYZ College",
  "department": "Computer Science",
  "year": "3",
  "gender": "Male",
  "eventName": "Tech Fest",
  "feedback": 9,
  "suggestions": "Great event"
}
```

- **Response (200):**
```json
{
  "message": "Feedback submitted. Certificate generated and emailed.",
  "student": {"_id": "..."}
}
```

- **Status Codes:**
  - `200` Success
  - `400` Validation error
  - `409` Duplicate submission for same event
  - `500` Server error

---

### POST `/api/admin/login`
- **Description:** Admin login, returns JWT.

- **Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin_password"
}
```

- **Response (200):**
```json
{
  "token": "<jwt_token>",
  "admin": {"email": "admin@example.com"}
}
```

- **Status Codes:**
  - `200` OK
  - `401` Invalid credentials
  - `500` Server error

---

### GET `/api/students`
- **Description:** List students with pagination/filtering.

- **Query Params (example):**
  - `page=1`
  - `limit=10`
  - `search=abc`
  - `sort=-createdAt`

- **Response (200):**
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0
  }
}
```

---

### GET `/api/student/:id`
- **Description:** Get student details by MongoDB ID.

- **Response (200):**
```json
{
  "data": {
    "_id": "...",
    "name": "..."
  }
}
```

---

### PUT `/api/student/:id`
- **Description:** Update student fields.

---

### DELETE `/api/student/:id`
- **Description:** Delete a student record.

---

### POST `/api/send-certificate`
- **Description:** Generate and send certificate for a student.

---

### POST `/api/resend`
- **Description:** Resend certificate email to student.

> Note: Exact request/response schemas can be reviewed in corresponding controller files.

---

## 📦 Database Schema (MongoDB)

### `Student` Collection
Fields:
- `name` (String)
- `email` (String, unique per event)
- `phone` (String)
- `state` (String)
- `college` (String)
- `department` (String)
- `year` (String/Number)
- `gender` (String)
- `eventName` (String)
- `feedback` (Number)
- `suggestions` (String, max 500)
- `certificateURL` (String)
- `certificateSent` (Boolean)
- `certificateId` (String)
- `createdAt` (Date)
- `updatedAt` (Date)

Indexes (expected):
- compound unique index like `(email, eventName)` to prevent duplicates.

---

## 📄 Certificate Generation (PDFKit)

### How PDF is generated
- PDFKit builds a landscape page.
- Layout includes:
  - watermark background
  - golden border
  - certificate title
  - student/event fields
  - QR code positioning
  - signature/date blocks

### Certificate ID Generation
- `CERT-YYYY-00001` style ID.
- Increment logic based on MongoDB counter or computed sequence.

### QR Generation
- QR payload includes:
  - certificateId
  - student name
  - verification URL

---

## 📬 Email Service

- Uses Nodemailer SMTP.
- Attaches generated certificate PDF.
- Sends HTML email using a template file.
- Retry/resend is supported through admin actions.

---

## ✅ Validation

### Frontend
- React Hook Form validations

### Backend
- express-validator validation
- Suggestions max 500 chars
- Feedback rating 1–10

### MongoDB Validation
- Mongoose schema validators

---

## 🔒 Security
- Helmet
- Rate limiter
- JWT authentication
- Password hashing (bcrypt)
- Mongo sanitization
- CORS
- XSS considerations

---

## 🛠️ Installation Guide

### 1) Clone
```bash
git clone https://github.com/TanmayHingankar/student_feedback_portal.git
cd student_feedback_portal
```

### 2) Configure Backend env
Create `server/.env` from `server/.env.example`.

### 3) Install & Run Backend
```bash
cd server
npm install
npm run dev
```

### 4) Install & Run Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🐳 Deployment

### Docker
```bash
docker compose up --build
```

Recommended: run MongoDB + backend + frontend behind a reverse proxy.

### Render / Vercel
- Frontend: Vercel
- Backend: Render (set env vars)

---

## ⚡ Performance Optimizations
- rate limiting
- pagination in admin tables
- server-side filtering/sorting
- reusable API calls

---

## 🔮 Future Improvements
- bulk certificate generation
- OTP-based email verification
- forgot password for admin
- certificate verification page UI

---

## 📄 License
MIT

---

## 👨‍💻 Author
**Tanmay Hingankar**

GitHub: https://github.com/TanmayHingankar

LinkedIn: (add placeholder)

