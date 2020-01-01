import React, { useState } from "react";
import styled from "styled-components";
const StyledInput = styled.input`
  min-width: 220px;
  width: 90%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: 20px; /* line-height 초기화 */
  padding: 0.8em 0.6em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  font-size: 15px;
  border: 1px solid #999;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function Input({ type, name, value, onChange, placeholder }) {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
