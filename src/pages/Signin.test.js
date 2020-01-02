import React from "react";
import Signin from "./Signin.js";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

//class에서는 state에 접근 위해서는 wrapper.state(), props에 접근 위해서는 wrapper.props()하면 된다. but 훅스에서는 state에 접근이 불가하다.

describe("<Signin />", () => {
  it("성공적으로 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.length).toBe(1);
  });

  it("이메일 인풋이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find("#email").length).toEqual(1);
  });

  it("비밀번호 인풋이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find("#password").length).toEqual(1);
  });

  // it("비밀번호 인풋이 변경되어야 합니다.", () => {
  //   const wrapper = shallow(<Signin />);
  //   wrapper.find("#password").simulate("change", { target: { value: "값" } });
  //   expect(wrapper.state().password).toBe("값");
  // });

  it("로그인 버튼이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find("#login_button").length).toEqual(1);
  });

  it("사인업 링크가 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find("#signup_link").length).toEqual(1);
  });

  // it("숫자가 올라가야 합니다.", () => {
  //   const wrapper = shallow(<Counter />);
  //   wrapper.find("#up").simulate("click");
  //   wrapper.find("#up").simulate("click");
  //   expect(wrapper.state().value).toBeLessThan(1);
  // });
});
