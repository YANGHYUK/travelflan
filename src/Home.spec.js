import { doIncrement, doDecrement } from "./Home";

describe("Local State", () => {
  it("state의 counter를 하나 올릴 수 있다", () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);

    expect(newState.counter).to.equal(1);
  });

  it("state의 counter를 하나 줄일 수 있다", () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);

    expect(newState.counter).to.equal(-1);
  });
});

const assert = require("assert");

describe("true", () => {
  it("should equal to true", () => {
    assert.equal(true, true);
  });
});
