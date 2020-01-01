import React, { useState } from "react";
import styled from "styled-components";

const StyledFiller = styled.div`
  background: #1da598;
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
`;

const Filler = ({ percentage }) => {
  return <StyledFiller style={{ width: `${percentage}%` }} />;
};

const StyledProgressBar = styled.div`
  position: relative;
  height: 20px;
  width: 350px;
  border-radius: 50px;
  border: 1px solid #333;
`;

export default function ProgressBar() {
  const [percentage, setPercentage] = useState(0);

  return (
    <StyledProgressBar>
      <Filler percentage={percentage} />
    </StyledProgressBar>
  );
}
