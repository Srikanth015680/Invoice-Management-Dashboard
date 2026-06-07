import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../app.js";
import connectDB from "../config/db.js";

dotenv.config();

beforeAll(async () => {
  await connectDB();
},15000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Analytics Routes", () => {
  test(
    "GET /api/analytics should return analytics",
    async () => {
      const res = await request(app).get(
        "/api/analytics"
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(
        res.body.summary
      ).toBeDefined();
      expect(
        res.body.topCustomers
      ).toBeDefined();
    },
    15000
  );
});