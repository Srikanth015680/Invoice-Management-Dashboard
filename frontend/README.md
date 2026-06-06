# Frontend

This is the frontend for the Invoice Management Dashboard project.

It is built with React and communicates with the backend API to manage invoices, display customer information, and show analytics data.

## Running the project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will run on:

```text
http://localhost:5173
```

## Backend API

The frontend expects the backend server to be running on:

```text
http://localhost:5000/api
```

API configuration can be found in:

```text
src/api/axios.js
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Docker

Build the Docker image:

```bash
docker build -t invoice-frontend .
```

Run the container:

```bash
docker run -p 5173:5173 invoice-frontend
```
