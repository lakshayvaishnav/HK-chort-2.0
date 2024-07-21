// supertest helps simulate the server request.
import request from "supertest";
import { app } from "../index";
import { describe, it, expect } from "@jest/globals";

describe("test to examine sum of 2 inputs", () => {
  it("takes 2 input and returns the sum", async () => {
    const res = await request(app).post("/sum").send({
      a: 2,
      b: 3,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(5);
  });

  it("takes incorrect inputs", async () => {
    const res = await request(app).post("/sum").send({});

    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect Inputs");
  });
});
