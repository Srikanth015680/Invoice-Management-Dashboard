# Invoice Management Dashboard

This project was built as part of a Full Stack Developer internship assignment.

It is a simple invoice management application that allows users to manage invoices, view customer information, and access business analytics through a dashboard interface.

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Seed Data

To populate the database with sample customers and invoices:

```bash
cd backend
npm run seed
```

## Testing

API tests were written using Jest and Supertest.

Run tests from the backend folder:

```bash
npm test
```

## Docker

Start the complete application using Docker Compose:

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## Project Overview

The application includes:

 Invoice management (create, update, delete)
 Search and filtering
 Pagination
 Customer profile page
 Analytics dashboard
 Docker support
 Automated API tests


## Repository Structure

```text
backend/
frontend/
seed-data.json
docker-compose.yml
```
