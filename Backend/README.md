# ENSI Junior Entreprise — Backend

REST API for the EJE website: contact form submissions, newsletter signups, and
a News/Magazines content API with admin-only CRUD.

Stack: Node.js, Express, MongoDB (Mongoose), JWT auth — same stack as the
matchmaking platform backend, for consistency.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `MONGODB_URI` — create a new database (e.g. `eje-website`) under your
     existing MongoDB Atlas account and paste its connection string here.
   - `JWT_SECRET` — any long random string.
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for the first admin account.
   - `SMTP_*` — optional. Leave blank to skip emailing contact-form
     notifications; submissions are still saved to the database either way.
3. Create the first admin account: `npm run seed:admin`
4. (Optional) Import the articles/magazine that used to be hardcoded in the
   frontend, so the News page has content from the start: `npm run seed:content`
5. Start the dev server: `npm run dev` (or `npm start` for production)

The API listens on `http://localhost:5000` by default. Uploaded article/magazine
files are served from `/uploads/...`.

## Endpoints

### Public

| Method | Path                    | Description                                  |
|--------|-------------------------|-----------------------------------------------|
| POST   | `/api/contact`          | Submit the contact form                       |
| POST   | `/api/newsletter/subscribe` | Subscribe an email to the newsletter      |
| GET    | `/api/articles`         | Paginated article list (`?page=&limit=`)      |
| GET    | `/api/articles/recent`  | Most recent articles (`?limit=`)              |
| GET    | `/api/articles/:idOrSlug` | Single article                              |
| GET    | `/api/magazines`        | All magazines                                 |
| GET    | `/api/magazines/:id`    | Single magazine                               |
| POST   | `/api/auth/login`       | Admin login, returns a JWT                    |

### Admin (require `Authorization: Bearer <token>` from `/api/auth/login`)

| Method | Path                    | Description                                   |
|--------|-------------------------|------------------------------------------------|
| GET    | `/api/auth/me`          | Current admin profile                          |
| GET    | `/api/contact`          | List contact submissions                        |
| GET    | `/api/newsletter`       | List active subscribers                          |
| POST/PUT/DELETE | `/api/articles[/:id]` | Create/update/delete an article (multipart `cover` file, or a `coverImage` URL) |
| POST/PUT/DELETE | `/api/magazines[/:id]` | Create/update/delete a magazine (multipart `cover` + `file`, or `coverImage`/`fileUrl` URLs) |

## Notes

- Rate limiting is applied to the contact form, newsletter signup, and login
  (10 requests / 15 min per IP) since these are the only unauthenticated write
  endpoints.
- Article `slug` is generated from the title automatically and stays stable
  across edits.
- An article/magazine can point at an externally-hosted image/PDF (pass a URL
  in the body) instead of uploading a file — useful for migrating the existing
  mocked content, which currently links out to LinkedIn/Unsplash images.
