import { doOnChange } from "./Signin";

describe("input form 테스트", () => {
  it("email는 양식을 지켰는가", () => {
    const state = {
      errors: { email: "", password: "" },
      email: "",
      password: "",
      active: false
    };
    const newState = doOnChange(state);

    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    expect(validEmailRegex.test(newState.email)).to.equal(true);
  });

  // it("비밀번호는 6글자 이상인지, 에러는 없는지", () => {
  //   const state = {
  //     errors: { email: "", password: "" },
  //     email: "",
  //     password: ""
  //   };
  //   const newState = doOnChange(state);
  //   //비밀번호가 6글자 이하일때, 에러메시지가 잘 뜨는지
  //   if (newState.password.length < 6) {
  //     expect(newState.errors.password).to.equal("비밀번호는 6글자 이상입니다.");
  //   }
  // });
});

const assert = require("assert");

describe("true", () => {
  it("should equal to true", () => {
    assert.equal(true, true);
  });
});
