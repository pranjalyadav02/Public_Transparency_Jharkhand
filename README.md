# Public Transparency & Accountability (Jharkhand Jan-Darpan)

Public transparency window of the Jharkhand Societal Innovation Platform. Answers the fundamental civic questions: *What was reported? Where is it? Who was responsible? What action was taken? What evidence proves it? Did the solution work?*

---

## Features
- **Public Transparency Dashboard**: State-wide headline numbers (total reported, verified, under action, resolved), expenditure tracking, and public trust indicators.
- **Problem Explorer**: Publicly browse civic challenges across Jharkhand with district, block, and status filters.
- **Data Lineage Modal**: Complete end-to-end audit trail for every public issue: citizen report &rarr; department response &rarr; assigned contractor &rarr; expenditure &rarr; resolution proof &rarr; community verification.
- **District Explorer**: Interactive comparison and performance scorecards for all 24 districts of Jharkhand.
- **Societal Impact Tracker**: Verified beneficiary counts, water access points restored, rural roads repaired, and school infrastructure improvements.
- **Open Data Portal**: Transparent, unredacted public datasets available for search, live API access, and instant CSV/JSON download.
- **Citizen Alert Subscriptions**: Allows citizens and journalists to subscribe to status updates on specific local infrastructure projects or districts.

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Framer Motion
- **Backend**: Node.js, Express, tsx
- **Persistence**: File-backed JSON store with transactional safety (`src/db/storage.ts`) synced with the shared governance store

---

## Default Port
Runs by default on **Port 3005**.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
PORT=3005
NODE_ENV=development
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to: [http://localhost:3005](http://localhost:3005)

### 4. Build for Production
```bash
npm run build
npm start
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/v1/transparency/overview` | Statewide public transparency metrics and resolution rates |
| `GET` | `/api/v1/transparency/challenges` | Public challenges list with search and filters |
| `GET` | `/api/v1/transparency/challenges/:id` | Challenge details with evidence and citizen audits |
| `GET` | `/api/v1/transparency/challenges/:id/lineage` | Full data lineage and accountability breakdown |
| `GET` | `/api/v1/transparency/districts` | 24 district performance scorecards |
| `GET` | `/api/v1/transparency/solutions` | Verified deployed solutions and replications |
| `GET` | `/api/v1/transparency/accountability` | Department scorecards and contractor penalty log |
| `GET` | `/api/v1/transparency/opendata` | Exportable open dataset (supports `?format=csv` or `?format=json`) |
| `POST` | `/api/v1/transparency/subscribe` | Register citizen email/SMS for status change alerts |
