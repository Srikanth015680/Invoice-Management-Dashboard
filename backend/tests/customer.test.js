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

describe("Customer Routes", () => {
  test(
    "GET /api/customers should return customers",
    async () => {
      const res = await request(app).get(
        "/api/customers"
      );

      expect(res.statusCode).toBe(200);
      expect(
        Array.isArray(res.body)
      ).toBe(true);
    },
    15000
  );
});