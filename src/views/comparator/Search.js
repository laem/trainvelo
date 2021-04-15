import React, { useContext } from "react";
import styled from "styled-components";

import SearchContext from "utils/SearchContext";

import ModeSelector from "./search/ModeSelector";
import Distance from "./search/Distance";
import Itinerary from "./search/Itinerary";

const Wrapper = styled.div`
  position: relative;
  padding: 1vh 0;

  font-size: 2rem;
  font-weight: 700;

  ${(props) => props.theme.mq.small} {
    font-size: 4.16vw;
  }
`;
export default function Search(props) {
  const { mode } = useContext(SearchContext);

  return (
    <Wrapper mode={mode} iframe={props.iframe}>
      <Itinerary />
    </Wrapper>
  );
}
