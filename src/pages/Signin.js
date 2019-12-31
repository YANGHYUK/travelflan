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
  flex-direction: columnj;
  align-items: center;
  justify-content: center;
`;

const SigninBox = styled.div`
  display: flex;
  width: ;
`;

const Signin = () => {
  return (
    <Container>
      <Row>
        <Column xs="12" sm="12" md="12">
          xs 12 sm 6 md 12
        </Column>
        <Column xs="6" md="4">
          xs 6 md 4
        </Column>
        <Column xs="6" md="4">
          xs 6 md 4
        </Column>
        <Column xs="6" md="4">
          xs 6 md 4
        </Column>
      </Row>
    </Container>
  );
};

export default Signin;
