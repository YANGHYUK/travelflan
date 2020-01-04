import React, { useState, useContext, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  Row,
  Column,
  MarginDiv,
  Text
} from "../components/ResponsiveComponents";

import Input from "../components/Input";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import Modal from "../components/Modal";

import UserInfoContext from "../contextAPI/UserInfo";

//link
const StyledLink = styled(Link)`
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: green;
  }
`;

const StyledTd = styled.p`
  min-width: 80px;
  text-align: center;
  vertical-align: middle;
  color: #bdc3c7;
  &:hover {
    color: white;
  }
`;

const SignContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
`;

const SigninBox = styled.div`
  display: flex;
  min-height: 600px;
  max-height: 800px;
  width: 50%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

const SigninBox_left = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;
const SigninBox_left_logo = styled.div`
  background-size: contain;
  background-image: url("https://image.flaticon.com/teams/slug/gregor-cresnar.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 110px;
  min-width: 220px;
  min-height: 220px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SigninBox_right = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const ErrorMessage = styled.div`
  color: #ed4c67;
  line-height: 20px;
  height: 20px;
`;

export const doOnChange = (values, errors, name, value) => ({
  ...values,
  errors,
  [name]: value
});

const Signin = props => {
  const [didMount, setDidMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const UserInfo = useContext(UserInfoContext);

  const [values, setValues] = useState({
    errors: { email: "", password: "" },
    email: "",
    password: "",
    active: false
  });

  const { errors, email, password } = values;

  const onChange = useCallback(e => {
    let { name, value } = e.target;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "이메일 양식이 아닙니다.";
        break;
      case "password":
        errors.password =
          value.length < 6 ? "비밀번호는 6글자 이상입니다." : "";
        break;
      default:
        break;
    }

    if (value.length) {
      setValues(() => doOnChange(values, errors, name, value));
    } else {
      errors[name] = "";
      setValues(() => doOnChange(values, errors, name, value));
    }
  });

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      let token = localStorage.getItem("token");
      //1번 로컬스토리지에 토큰 있으면, 현재 입력값과 토큰값이 일치하는지 확인
      UserInfo.filter(ele => {
        if (ele.email === email && ele.password === password) {
          localStorage.setItem("token", email + "/" + password);
          props.history.push("/main");
        }
      });

      //2번 로컬스토리지에 토큰 없다면 DB에 저장되어있다고 치는 하드코딩된 context api 값 확인
      if (token) {
        let savedUserInfo = token.split("/").join("");
        if (savedUserInfo === email + password) {
          props.history.push("/main");
        }
      } else {
        //회원가입한 아이디랑 UserInfo에 저장되어있는 아이디가 아니면 알림 모달 출현
        setModalOpen(true);
        setLoading(false);
        resetForm();
      }
    }, 600);
  };

  const onhandleEnter = e => {
    if (e.keyCode === 13) {
      email.length && password.length && !errors.email && !errors.password
        ? onSubmit()
        : false;
    }
  };

  const resetForm = () => {
    setValues({
      errors: { email: "", password: "" },
      email: "",
      password: "",
      active: false
    });
  };

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    // <UserInfoContext.Provider>
    <Container>
      {modalOpen ? (
        <Modal
          setModalOpen={setModalOpen}
          content="아이디 혹은 비밀번호를 확인해주세요"
        />
      ) : null}
      <Row>
        <Column xs="12" sm="12" md="12">
          <div style={{ margin: "20px" }}>
            <Text fontSize="1.5rem" color="white" fontWeight="bold">
              Travelstagram
            </Text>
          </div>
          <SignContainer>
            {loading ? <ProgressBar /> : <MarginDiv margin="20px 0 20px 0" />}
            <SigninBox>
              <Row>
                <Column xs="12" md="12" lg="6">
                  <SigninBox_left>
                    <div style={{ color: "white", fontSize: "30px" }}>
                      WELCOME
                    </div>
                    <MarginDiv margin="30px 0 30px 0" />
                    <SigninBox_left_logo />
                  </SigninBox_left>
                </Column>
                <Column xs="12" md="12" lg="6">
                  <SigninBox_right>
                    <div style={{ color: "white", fontSize: "30px" }}>
                      SIGN IN
                    </div>
                    <MarginDiv margin="30px 0 10px 0" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={email || ""}
                      onChange={onChange}
                      placeholder="email"
                    />
                    <ErrorMessage>{errors.email}</ErrorMessage>
                    <MarginDiv margin="30px 0 10px 0" />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={password || ""}
                      onChange={onChange}
                      onKeyPress={e => onhandleEnter(e)}
                      placeholder="password"
                    />
                    <ErrorMessage>{errors.password}</ErrorMessage>
                    <MarginDiv margin="30px 0 10px 0" />
                    <Button
                      id="login_button"
                      active={
                        email.length &&
                        password.length &&
                        !errors.email &&
                        !errors.password
                          ? true
                          : false
                      }
                      onClick={
                        email.length &&
                        password.length &&
                        !errors.email &&
                        !errors.password
                          ? onSubmit
                          : null
                      }
                      name="로그인"
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "cetner"
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#ecf0f1",
                          marginTop: "17px"
                        }}
                      >
                        아이디가 없다면 ➜
                      </div>
                      <StyledLink to="/signup" id="signup_link">
                        <StyledTd>SIGN UP</StyledTd>
                      </StyledLink>
                    </div>
                  </SigninBox_right>
                </Column>
              </Row>
            </SigninBox>
          </SignContainer>
        </Column>
      </Row>
    </Container>
  );
};

export default Signin;
