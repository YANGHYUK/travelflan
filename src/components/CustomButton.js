import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${props => (props.width ? props.width : "135px")};
  height:${props => (props.height ? props.height : "35px")};

  border-radius:10px;
  font-family: NotoSansKR;
  font-size: 15px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.47;
  letter-spacing: -0.75px;
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#bdc3c7"}
  cursor:pointer;
  &:hover {
    background-color:black;
    border: solid 1px #cdcfd4;
    color:white;
  }
  margin-top:10px;
  margin-bottom: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;
`;

export default function CustomButton({ active, onClick, name }) {
  return (
    <StyledButton active={active} onClick={onClick}>
      {name}
    </StyledButton>
  );
}
