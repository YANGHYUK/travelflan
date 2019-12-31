import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(0, 0, 0, 0.6);
`;

export const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

function getWidthString(span) {
  if (!span) return;
  let width = (span / 12) * 100;
  return `width: ${width}%;`;
}

export const Column = styled.div`
  float: left;
  ${props => (props.xs ? getWidthString(props.xs) : "width:100%")};

  @media only screen and (min-width: 768px) {
    ${props => props.sm && getWidthString(props.sm)};
  }
  @media only screen and (min-width: 992px) {
    ${props => props.md && getWidthString(props.md)};
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;
