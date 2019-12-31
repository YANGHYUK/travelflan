import React from "react";
import styled from "styled-components";
import {
  Container,
  Row,
  Column,
  getWidthString
} from "../components/StyledComponents";

const SignContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SigninBox = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 80vh;
  width: 50%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

const Signin = () => {
  return (
    <Container>
      <Row>
        <Column xs="12" sm="12" md="12">
          <SignContainer>
            <SigninBox></SigninBox>
          </SignContainer>
        </Column>
      </Row>
    </Container>
  );
};

export default Signin;
