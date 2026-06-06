import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app.js";
import connectDB from "../config/db.js";

dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Invoice Routes", () => {
  test(
    "GET /api/invoices should return invoices",
    async () => {
      const res = await request(app).get(
        "/api/invoices"
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(
        Array.isArray(res.body.invoices)
      ).toBe(true);
    },
    15000
  );
});