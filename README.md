# Tech Interview Platform — Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-f8bc45?logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint)](https://eslint.org/)
[![Mobile Friendly](https://img.shields.io/badge/Mobile%20Friendly-Yes-brightgreen)]()

> **Tech Interview Platform** — a modern web app for preparing technical interviews.  
> Users can take AI-generated quizzes, chat with an AI interviewer in real time, and improve their resumes.  
> Built with **Next.js** and designed for clean, scalable code with minimal dependencies.

---

## 🌐 Live Environments

- **Production:** [https://gradiorai.ru](https://gradiorai.ru)
- **Staging:** [https://interviewready.ru](https://interviewready.ru)

Both environments are continuously deployed and synced with the main and staging branches.

---

## 🚀 Features

### 🧠 Core Functionality
- **AI-Generated Tests:** Questions and answers are generated dynamically based on selected difficulty and topic.
- **AI Interview Chat:** Simulates a real interview with an AI interviewer via Server-Sent Events (SSE) for real-time typing animation.
- **Resume Builder:** Generate or improve your resume using AI suggestions and templates.

### 👤 User System
- **Google Authentication** via OAuth.
- **Role-Based Access:**
  - Guest pages (only for non-authenticated users)
  - User-only sections (profile, tests, interview)
  - Admin-only dashboard

### 🛠️ Admin Panel
A fully custom administration dashboard with:
- User statistics and logs
- Backup download & file upload/delete system
- Server logs viewer
- On-the-fly localization editor (switch language and edit text directly in a modal window)

### 🌍 Localization
- Built-in localization service with **two supported languages**.
- Hot-reload of translations: press a shortcut to open a modal and edit strings in real time.

### 📱 Responsive Design
- Fully responsive layout — optimized for **mobile**, **tablet**, and **desktop**.
- Uses minimal external UI libraries to keep the build lightweight and maintainable.

### 🏆 Gamification
- User **rating system**
- **Achievements** for completing tests, interviews, or specific milestones
- User **profile** with history of past tests and interviews

---

## 🧩 Tech Stack

| Area              | Tech / Library         |
|-------------------|------------------------|
| Framework         | [Next.js 14](https://nextjs.org/) |
| Language          | [TypeScript](https://www.typescriptlang.org/) |
| Styling / Layout  | CSS Modules / Tailwind (if used) |
| Auth              | Google OAuth (NextAuth / custom) |
| Realtime          | SSE (Server-Sent Events) |
| Linting / Format  | ESLint, Prettier |
| State Management  | Built-in React hooks (minimal external libs) |
| Deployment        | Staging & Production VPS servers via CI/CD |

---

## ⚙️ Getting Started (Local Development)

### 1️⃣ Clone the repository

git clone [https://github.com/YourUser/gradiorai-front.git](https://github.com/Lugzan151892/gradiorai-front.git)
cd gradiorai-front

### 2️⃣ Install dependencies

npm install
# or
pnpm install
# or
yarn install

### 3️⃣ Run the development server

npm run dev

## 🧹 Code Quality

ESLint ensures consistent and error-free code.
Prettier maintains clean formatting across the project.

## 🧠 SSE (Server-Sent Events)

Used for simulating real-time typing during AI interviews:
Efficient one-way communication channel from server → client.
Lightweight alternative to WebSockets.
Smooth “typing” effect in chat interface.

## 🔐 Access Control Overview

| User Role          | Access Level                                    |
| ------------------ | ----------------------------------------------- |
| Guest              | Login / Register / Public pages                 |
| Authenticated User | Tests, Interview, Resume, Profile               |
| Admin              | Admin dashboard, logs, backups, file management |

## 🧑‍💻 Author
Denis (Lugzan151892)
Frontend Developer (Next.js + TypeScript)
📫 Telegram: @denis1518

🔗 GitHub: https://github.com/Lugzan151892

