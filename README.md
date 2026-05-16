# Makeup Live

Makeup Live is a full-stack academic project for a Programming III integrative assignment. It is a beauty and makeup social platform where users can register, login, browse tutorials, discover products, save favorites, join live sessions, chat in real time and receive live notifications.

## Main stack

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Database manager: DBeaver compatible
- Authentication: JWT
- Realtime: Socket.IO
- API documentation: Swagger / OpenAPI
- Environment variables: dotenv
- Deployment-ready: Render, Railway or Heroku

## Academic requirements covered

- Object-oriented JavaScript with ES6 classes:
  - User
  - Product
  - Tutorial
  - LiveSession
  - NotificationManager
- Modular backend architecture
- PostgreSQL persistence
- GET endpoints and POST endpoints with body
- Authentication and authorization with JWT
- Swagger API documentation
- Socket.IO realtime chat, reactions and notifications
- External API integration architecture with fallback mock services
- GitHub-ready folder structure

## Project structure

```text
makeup-live/
  backend/
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      services/
      sockets/
      app.js
      server.js
    package.json
    .env.example
  frontend/
    index.html
    pages/
    assets/
      css/
      js/
        api/
        classes/
        pages/
  database/
    schema.sql
    seed.sql
  docs/
    api-examples.md
  public/
  README.md
```

## PostgreSQL setup

Create the database:

```sql
CREATE DATABASE makeup_live;
```

Run the schema:

```bash
psql -U postgres -d makeup_live -f database/schema.sql
```

Run seed data:

```bash
psql -U postgres -d makeup_live -f database/seed.sql
```

Demo user:

```text
Email: demo@makeuplive.com
Password: password123
```

## DBeaver connection

1. Open DBeaver.
2. Create a new PostgreSQL connection.
3. Use:
   - Host: localhost
   - Port: 5432
   - Database: makeup_live
   - User: postgres
   - Password: your local password
4. Test connection.
5. Open SQL Editor and run:
   - `database/schema.sql`
   - `database/seed.sql`

## Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend URL:

```text
http://localhost:4000
```

Swagger documentation:

```text
http://localhost:4000/api/docs
```

## Frontend setup

The frontend is static HTML/CSS/JS.

Recommended for Visual Studio Code:

1. Install the Live Server extension.
2. Open the `frontend` folder.
3. Start Live Server from `index.html`.

Expected frontend URL:

```text
http://localhost:5500
```

If your Live Server runs on another port, update `FRONTEND_URL` in `backend/.env`.

## External APIs

The project includes two external API-ready services:

1. Makeup products API:
   - `backend/src/services/externalProductService.js`
   - Default endpoint: Makeup API
   - Fallback mock products if unavailable

2. Content/media API:
   - `backend/src/services/mediaService.js`
   - Ready for YouTube, Pexels or Unsplash API keys
   - Fallback mock media if keys are missing

Environment variables:

```env
MAKEUP_API_URL=http://makeup-api.herokuapp.com/api/v1/products.json
YOUTUBE_API_KEY=
PEXELS_API_KEY=
UNSPLASH_ACCESS_KEY=
```

## Core API endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
```

### Tutorials

```text
GET /api/tutorials
GET /api/tutorials/:id
GET /api/tutorials/external/media
```

### Products

```text
GET /api/products
GET /api/products/external
```

### Favorites

```text
POST /api/favorites
GET /api/favorites
DELETE /api/favorites/:id
```

### Live sessions

```text
GET /api/live-sessions
```

### Messages

```text
POST /api/messages
```

### Notifications

```text
GET /api/notifications
PATCH /api/notifications/read
```

### Profile

```text
GET /api/profile
PUT /api/profile
```

## JWT authorization

Protected routes require:

```text
Authorization: Bearer YOUR_TOKEN
```

You receive the token from:

```text
POST /api/auth/login
```

## Socket.IO events

Client emits:

```text
live:join
chat:typing
reaction:send
```

Server emits:

```text
chat:message
notification:new
reaction:new
```

## Deployment notes

### Render or Railway

1. Create a PostgreSQL database.
2. Copy the external database URL.
3. Set backend environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=...`
   - `JWT_SECRET=...`
   - `FRONTEND_URL=...`
4. Deploy the `backend` folder as a Node.js service.
5. Run schema and seed SQL in the hosted PostgreSQL console.
6. Deploy frontend as a static site or serve it separately.

## GitHub workflow

```bash
git init
git add .
git commit -m "Initial Makeup Live full-stack project"
git branch -M main
git remote add origin https://github.com/YOUR_USER/makeup-live.git
git push -u origin main
```

## Suggested next improvements

- Add role-based creator dashboard
- Add real video streaming provider integration
- Improve favorite joins to return full tutorial/product data
- Add pagination and search
- Add unit tests
- Add image uploads for looks
