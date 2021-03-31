import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";

import TransportationContext from "utils/TransportationContext";
import SearchContext from "utils/SearchContext";

import Transportation from "./results/Transportation";

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  margin-bottom: 2rem;
`;
export default function Results() {
  const {
    transportations,
    transportationsVisibles,
    transportationsAlwaysVisibles,
    carpool,
    uncertainty,
  } = useContext(TransportationContext);
  const { km, itinerary } = useContext(SearchContext);

  console.log(itinerary);

  return (
    <Wrapper>
      Votre trajet fait à vol d'oiseau {km} km.
      <br />- Super ! Cela me fait une belle jambe !
    </Wrapper>
  );
}
