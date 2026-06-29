# FindTheWay AI Travel Planner (Phase 2)

A premium, production-ready full stack travel website featuring a **FastAPI backend** (SQLite/PostgreSQL) and a **Next.js 15 App Router frontend**.

---

## 1. Project Restructured Architecture

The monorepo is divided into:
* **`backend/`**: Built with Python FastAPI, SQLAlchemy ORM, SQLite/PostgreSQL, slowapi rate limiting, CORS configuration, and secure JWT-based HttpOnly cookies.
* **`frontend/`**: Built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and Leaflet Maps.

---

## 2. Running Frontend Locally

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The site will load automatically at **[http://localhost:3001](http://localhost:3001)**.

---

## 3. Running Backend Locally

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install Python 3 requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI API server using Uvicorn:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   * **API Root**: [http://localhost:8000](http://localhost:8000)
   * **Swagger Interactive Schema Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

*Note: The database connection will automatically default to local SQLite (`backend/findtheway.db`) if no `DATABASE_URL` environment variable is specified, seeding itself with realistic mock travel data on first boot.*

---

## 4. Key Highlights & Features Implemented

* **Dual-Mode API Client Wrapper (`lib/api.ts`)**: Dynamically detects if the FastAPI server is running. If it goes offline, it automatically intercepts calls and serves local memory mock structures with a console message, ensuring the frontend is robust.
* **Smart Autocomplete**: Powered by SQL ilike expressions matching tourist attractions, stays, dining, and cities.
* **Role-Based Protected Routes**: Secures critical resources via JWT signature check shims (`admin` vs `user`).
