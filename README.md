# CRM Dashboard

A modular, role-based CRM dashboard system developed during the **Humblewalking** internship.  
It helps organizations manage **scheduling, record-keeping, and analytics**, with tailored dashboards for each role to keep workflows smooth and decision-making fast.

---

## 🌟 Key Features

### 🔐 Role-Based Dashboards
Each role sees a customized workspace with relevant data and actions:

- **CEO Dashboard**
  - High-level summary of counselling & interview activity
  - Quick view of upcoming events and overall load
  - Basic analytics/insights for decision-making

- **Counsellor Dashboard**
  - Calendar view of all counselling appointments
  - View / manage upcoming sessions
  - Access to candidate / student details relevant to each appointment

- **HR Dashboard**
  - View and manage **interview / hiring appointments**
  - Upload CSV data for records or analytics
  - Access dashboards showing trends and stats useful for HR

### 📅 Scheduling & Calendar
- Integrated calendar view for appointments
- Role-specific event lists and details
- Support for creating new appointments from the dashboard UI

### 📊 Analytics & Insights
- Basic analytics panels (counts, trends, summaries)
- Focus on making it easy for leadership roles (like CEO/HR) to see what’s happening at a glance

### 🧱 Modular Architecture
- **Next.js App Router** frontend
- **Backend** separated in its own folder for APIs & database logic
- Clear separation of concerns: `app/`, `components/`, `hooks/`, `lib/`, `backend/`, etc.

### 🎨 Modern UI
- Built with **TypeScript**, **Tailwind CSS**, and reusable components
- Consistent theme across all dashboards
- Responsive layout suitable for desktop usage

---

## 🧰 Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- React hooks & custom hooks (`/hooks`)
- Tailwind CSS
- Reusable UI components (`/components`)

**Backend**
- Node.js (Express-style backend inside `/backend`)
- REST-style APIs for appointments, records, and analytics
- MongoDB (or another database) for persistent storage

---

## 📂 Project Structure

```text
CRM-DASHBOARD/
├── app/                 # Next.js app router pages/routes
├── backend/             # Backend server (APIs, DB logic)
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, helpers, config
├── public/              # Static assets
├── styles/              # Global styles (Tailwind, globals.css, etc.)
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Frontend dependencies & scripts
└── pnpm-lock.yaml / package-lock.json
