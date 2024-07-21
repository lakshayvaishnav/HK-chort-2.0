import { describe, it, expect } from "@jest/globals";
import { app } from "../index";
import request from "supertest";
describe("POST /SUM", () => {
  it("returns the sum ", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    console.log(res.body);
    expect(res.body.answer).toBe(3);
  });
});
