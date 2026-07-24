# DocSense AI

A full-stack AI document analyzer. Upload a PDF, and DocSense AI extracts the text and uses
Google Gemini to generate a summary, key points, named entities, sentiment, and category —
all behind a JWT-authenticated, professional SaaS UI.

## Tech stack

**Frontend:** React (Vite), plain CSS3 (no Tailwind), Framer Motion, React Router, Axios, react-icons
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer, pdf-parse, Google Gemini API (`@google/generative-ai`)

## Project structure

```
docsense-ai/
├── backend/
│   ├── config/db.js
│   ├── models/User.js
│   ├── models/Document.js
│   ├── middleware/auth.js
│   ├── middleware/upload.js
│   ├── controllers/authController.js
│   ├── controllers/documentController.js
│   ├── routes/authRoutes.js
│   ├── routes/documentRoutes.js
│   ├── utils/pdfParser.js
│   ├── utils/geminiService.js
│   ├── uploads/            (created automatically)
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/      (Navbar, Sidebar, Button, Card, Loader, Badge,
    │   │                      StatCard, DocumentCard, EmptyState, PageHeader,
    │   │                      DashboardLayout, ProtectedRoute)
    │   ├── pages/            (Landing, Login, Register, Dashboard, Upload,
    │   │                      Documents, DocumentView)
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — your MongoDB connection string (local or MongoDB Atlas)
- `JWT_SECRET` — any long random string
- `GEMINI_API_KEY` — get a free key at https://aistudio.google.com/app/apikey
- `CLIENT_URL` — the frontend origin (default `http://localhost:5173`)

Run the server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## How it works

1. A user registers/logs in — the backend issues a JWT, stored in `localStorage` and
   attached to every API request via an Axios interceptor.
2. On the Upload page, a PDF is sent via `multipart/form-data` to `POST /api/documents/upload`.
3. Multer saves the file to `backend/uploads/`, `pdf-parse` extracts the raw text, and the
   text is sent to Gemini with a strict JSON-output prompt.
4. The parsed analysis (summary, key points, entities, sentiment, category) is saved to
   MongoDB alongside the document metadata and returned to the client.
5. The Dashboard, Documents list, and Document detail pages read from `/api/documents/*`,
   all protected by the `protect` JWT middleware.

## Notes

- Only PDF files are accepted, capped at 10MB by default (`MAX_FILE_SIZE_MB` in `.env`).
- If Gemini analysis fails (e.g. invalid key, rate limit), the document is still saved with
  `status: "failed"` and the raw extracted text intact — nothing is silently lost.
- The Gemini free tier has rate limits; if you hit them, wait a minute or upgrade your key.
