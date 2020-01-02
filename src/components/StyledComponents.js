import styled from "styled-components";
//반응형 레이아웃
export const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
    width: 100%;
  }
  width: 100%;
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

export const MarginDiv = styled.div`
  margin: ${props => props.margin};
`;

export const Text = styled.span`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  margin: ${props => props.margin};
  font-weight: ${props => props.fontWeight};
`;

//컴포넌트
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, #5f57ea 0%, #9647db 100%);
`;
export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right, #686de0 0%, #9647db 100%);
`;
