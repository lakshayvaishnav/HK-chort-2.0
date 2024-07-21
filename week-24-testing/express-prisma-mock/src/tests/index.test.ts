import { prismaclient } from "../db";
import { describe, expect, it, vi } from "vitest";
import { app } from "../index";
import request from "supertest";

vi.mock("../db", () => ({
  prismaclient: { sum: { create: vi.fn() } },
}));

describe("/sum ", () => {
  it("adds 2 numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });
});
