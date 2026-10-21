# AI Resume Analyzer

A full-stack web application that leverages Google's Gemini AI to analyze resumes against job descriptions. It provides instant match percentages, skill gap analysis, and tailored interview questions to help candidates optimize their applications.

**Live Demo:** [Insert your frontend Render URL here]
**API Endpoint:** [Insert your backend Render URL here]

## Features
* **AI-Powered Analysis:** Uses Gemini 3.5 Flash Lite to extract data and intelligently compare resumes against job descriptions.
* **Secure Authentication:** JWT-based user authentication with securely hashed passwords using bcrypt.
* **Enterprise-Grade Security:** Integrated with Arcjet for rate-limiting and bot protection, plus Helmet for HTTP header security.
* **Serverless Database:** Fully managed serverless PostgreSQL using Neon DB.
* **Containerized Architecture:** Fully dockerized frontend (Nginx) and backend (Node.js) for seamless deployment.

## Tech Stack
* **Frontend:** React, Vite, React Router, CSS
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Neon Serverless)
* **AI Integration:** Google Gen AI SDK (Gemini API)
* **Security:** Arcjet, JSON Web Tokens (JWT), bcrypt, Helmet
* **Deployment & DevOps:** Docker, Nginx, Render

## Local Setup & Development

### Prerequisites
* Docker Desktop installed and running.
* API Keys for Gemini, Neon DB, and Arcjet.

### 1. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_neon_postgres_url
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secure_random_string
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development