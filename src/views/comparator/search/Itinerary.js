import React from "react";
import styled from "styled-components";

import Address from "./itinerary/Address";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  ${(props) => props.theme.mq.medium} {
    font-size: 1.5rem;
  }
`;
const Start = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1.5rem;
`;
export default function Itinerary() {
  return (
    <Wrapper>
      <Start>Mon voyage est-il faisable en train + vélo&nbsp;?</Start>
      <Address type="from" />
      <Address type="to" />
    </Wrapper>
  );
}
