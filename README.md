# CRM Dashboard

A modular, role-based **CRM dashboard** system developed during the **Humblewalking** internship.  
It helps organizations manage **scheduling, record-keeping, and analytics**, with separate dashboards for each role to streamline workflows and decision-making.

---

## 🌟 Features

### 🔐 Role-Based Dashboards

Each role gets its own dedicated dashboard:

| Role | Capabilities |
|------|--------------|
| **CEO** | View overall activity, upcoming events, and analytics |
| **Counsellor** | Manage counselling appointments and candidate information |
| **HR** | Manage interview schedules, upload CSVs, and view hiring-related analytics |

---

### 📅 Calendar & Appointment Management
- Central appointment scheduling
- Calendar + list views
- Role-specific actions and details

### 📊 Analytics & Insights
- Summary counts and usage trends
- High-level insight panels for CEO and HR

### 🧱 Modular Architecture
- **Next.js App Router** for UI
- **Backend (Node.js + MongoDB)** in dedicated folder
- Clean folder separation for scalability

### 🎨 Modern UI
- Dedicated dashboards for roles
- Built with **TypeScript + Tailwind CSS**
- Responsive layout & consistent theme

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js · TypeScript · Tailwind CSS |
| Backend | Node.js · Express |
| Database | MongoDB |
| Data Flow | REST APIs |

---

## 📂 Project Structure

```text
CRM-DASHBOARD/
├─ app/                 # Next.js App Router pages
├─ backend/             # Node.js + Express backend
├─ components/          # Reusable UI components
├─ hooks/               # Custom React hooks
├─ lib/                 # Helpers / utilities / configuration
├─ public/              # Static assets
├─ styles/              # Global styles
├─ next.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json


