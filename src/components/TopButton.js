import styled from "styled-components";

const TopButton = styled.button`
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;

  position: fixed;
  bottom: 150px;
  right: 0;
  margin-right: 7%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: solid 1px #e84393;
  cursor: pointer;
  background-color: #fd79a8;

  color: white;

  &:hover {
    background-color: #e84393;
    border: solid 1px #fd79a8;
    color: #ecf0f1;
  }

  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

export default TopButton;
