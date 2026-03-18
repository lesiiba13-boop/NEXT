# NEXT — Backend API

Node.js + Express + PostgreSQL backend for the NEXT SaaS website.

## Stack
- **Runtime**: Node.js + Express
- **Database**: PostgreSQL
- **Auth**: JWT (access) + UUID refresh tokens
- **Email**: Nodemailer (works with any SMTP — Gmail, Resend, Mailgun, etc.)

---

## Quick Start

### 1. Install dependencies
```bash
cd next-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Fill in `.env` with your values:
- `DATABASE_URL` — your PostgreSQL connection string
- `JWT_SECRET` — a long random string (use `openssl rand -hex 64`)
- `SMTP_*` — your email provider credentials

### 3. Set up the database
```bash
# Create the database first
createdb next_db

# Run migrations
npm run migrate
```

### 4. Start the server
```bash
# Development (auto-restarts)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## API Reference

### Auth Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login, receive tokens |
| `GET`  | `/api/auth/verify-email?token=…` | Verify email address |
| `POST` | `/api/auth/forgot-password` | Request password reset email |
| `POST` | `/api/auth/reset-password` | Reset password with token |
| `POST` | `/api/auth/refresh` | Get new access token |
| `POST` | `/api/auth/logout` | Revoke refresh token |
| `POST` | `/api/auth/resend-verification` | Resend verification email |

### User Endpoints (require `Authorization: Bearer <token>`)

| Method | Path | Description |
|--------|------|-------------|
| `GET`    | `/api/user/me` | Get current user profile |
| `PATCH`  | `/api/user/me` | Update name |
| `DELETE` | `/api/user/me` | Deactivate account |
| `GET`    | `/api/user/dashboard` | Dashboard stats + usage |

---

## Example Requests

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","password":"Secret123","plan":"starter"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"Secret123"}'
```

### Get Dashboard (authenticated)
```bash
curl http://localhost:5000/api/user/dashboard \
  -H "Authorization: Bearer <your_access_token>"
```

---

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one number

---

## Email Setup (Gmail)
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use that as `SMTP_PASS` in your `.env`

## Email Setup (Resend — recommended for production)
1. Sign up at [resend.com](https://resend.com)
2. Set `SMTP_HOST=smtp.resend.com`, `SMTP_PORT=465`, `SMTP_USER=resend`, `SMTP_PASS=<api_key>`

---

## Deployment Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use a strong random `JWT_SECRET`
- [ ] Use a managed PostgreSQL (Railway, Supabase, Neon, RDS)
- [ ] Set `APP_URL` to your real frontend domain
- [ ] Configure CORS `origin` in `server.js` to your domain only
- [ ] Set up SSL/TLS (handled by your hosting provider)
