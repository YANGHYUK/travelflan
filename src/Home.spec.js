import { doCheckToken } from "./Home";

describe("메인페이지 토큰 테스트", () => {
  it("토큰이 있는지 확인을 하는가", () => {
    const newState = doCheckToken();
    expect(newState).to.equal(true);
  });
});

const assert = require("assert");
describe("true", () => {
  it("should equal to true", () => {
    assert.equal(true, true);
  });
});
