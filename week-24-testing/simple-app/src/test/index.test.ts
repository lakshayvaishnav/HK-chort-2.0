import { sum, multiply } from "../index";

//  describe , expect , it , toBe

import { describe, expect, it } from "@jest/globals";

describe("testing sum function", () => {
  it("adds 2 number", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("should return the sum of negative numbers", () => {
    expect(sum(-1, -3)).toBe(-4);
  });
});

describe("testing multiply function", () => {
  it("should multiply 2 numbers", () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
