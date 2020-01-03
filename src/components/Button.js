import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  min-width: ${props => (props.width ? props.width : "220px")};
  height:${props => (props.height ? props.height : "48px")};
  border: solid 1px #cdcfd4;
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
  background-color: ${props => (props.active ? "#247082" : "#cdcfd4 ")}
  cursor: ${props => (props.active ? "pointer" : null)}
  border: ${props => (props.active ? "solid 1px #247082" : null)}
  &:hover {
    background-color:#184954;
    border: none;
  }
  margin-top:10px;
  margin-bottom: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;
`;

export default function Button({ active, onClick, name }) {
  return (
    <StyledButton active={active} onClick={onClick}>
      {name}
    </StyledButton>
  );
}
