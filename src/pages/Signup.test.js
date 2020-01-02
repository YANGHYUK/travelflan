import React from "react";
import Signup from "./Signup.js";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("<Signup />", () => {
  it("성공적으로 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.length).toBe(1);
  });

  it("이메일 인풋이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find("#email").length).toEqual(1);
  });

  it("비밀번호 인풋이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find("#password").length).toEqual(1);
  });

  it("회원가입 버튼이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find("#signup_button").length).toEqual(1);
  });

  it("사인인 링크가 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find("#signin_link").length).toEqual(1);
  });
});
