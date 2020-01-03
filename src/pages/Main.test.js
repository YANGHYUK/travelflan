import React from "react";
import Main from "./Main.js";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("<Main />", () => {
  it("성공적으로 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.length).toBe(1);
  });

  it("헤더가렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("#header").length).toEqual(1);
  });

  it("리스트 컴포넌트가 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find("#listgrid").length).toEqual(1);
  });

  it("인풋모달이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find("#inputmodal").length).toEqual(1);
  });

  it("리스트 추가 버튼이 렌더링되어야 합니다.", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find("#add_listbutton").length).toEqual(1);
  });
});
