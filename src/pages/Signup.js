import React, { useState, useEffect, useContext, useCallback } from "react";
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
  min-width: 120px;
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

const SignupBox = styled.div`
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

const SignupBox_left = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;
const SignupBox_left_logo = styled.div`
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

const SignupBox_right = styled.div`
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

const doOnChange = (values, errors, name, value) => ({
  ...values,
  errors,
  [name]: value
});

const Signup = props => {
  const [didMount, setDidMount] = useState(false);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    errors: { email: "", password: "" },
    email: "",
    password: "",
    active: false
  });

  const { errors, email, password } = values;

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", email + "/" + password);
      props.history.push("/signin");
    }, 600);
  };

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

  const onhandleEnter = e => {
    if (e.key === "Enter") {
      email.length && password.length && !errors.email && !errors.password
        ? onSubmit()
        : false;
    }
  };

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Column xs="12" sm="12" md="12">
          <div style={{ margin: "20px" }}>
            <Text fontSize="1.5rem" color="white" fontWeight="bold">
              Travelstagram
            </Text>
          </div>
          <SignContainer>
            {loading ? <ProgressBar /> : <MarginDiv margin="20px 0 20px 0" />}
            <SignupBox>
              <Row>
                <Column xs="12" md="12" lg="6">
                  <SignupBox_left>
                    <div style={{ color: "white", fontSize: "30px" }}>
                      WELCOME
                    </div>
                    <MarginDiv margin="30px 0 30px 0" />
                    <SignupBox_left_logo />
                  </SignupBox_left>
                </Column>
                <Column xs="12" md="12" lg="6">
                  <SignupBox_right>
                    <div style={{ color: "white", fontSize: "30px" }}>
                      SIGN UP
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
                      placeholder="password"
                    />
                    <ErrorMessage>{errors.password}</ErrorMessage>
                    <MarginDiv margin="30px 0 10px 0" />
                    <Button
                      id="signup_button"
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
                      name="회원가입"
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                      }}
                    >
                      <StyledLink to="/signin" id="signin_link">
                        <StyledTd>SIGN IN</StyledTd>
                      </StyledLink>
                    </div>
                  </SignupBox_right>
                </Column>
              </Row>
            </SignupBox>
          </SignContainer>
        </Column>
      </Row>
    </Container>
  );
};

export default Signup;
