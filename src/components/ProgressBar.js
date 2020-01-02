import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledFiller = styled.div`
  background: #1da598;
  height: 100%;
  border-radius: inherit;
  transition: width 0.9s ease-in;
`;

const Filler = ({ percentage }) => {
  return <StyledFiller style={{ width: `${percentage}%` }} />;
};

const StyledProgressBar = styled.div`
  position: relative;
  height: 18px;
  width: 50%;
  border-radius: 50px;
  border: 1px solid #ecf0f1;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export default function ProgressBar() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(100);
  });

  return (
    <StyledProgressBar>
      <Filler percentage={percentage} />
    </StyledProgressBar>
  );
}
