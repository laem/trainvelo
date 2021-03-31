import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";

import TransportationContext from "utils/TransportationContext";
import SearchContext from "utils/SearchContext";

import Transportation from "./results/Transportation";
import gares from "../../gares.json";
import { distance, point } from "@turf/turf";

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

  const gareProche = gares.sort(
    (g1, g2) => gareDistance(g1, itinerary) - gareDistance(g2, itinerary)
  );

  console.log(gareProche);

  return (
    <Wrapper>
      Votre trajet fait à vol d'oiseau {km} km.
      <br />- Super ! Cela me fait une belle jambe !{gareProche[0].libelle}
    </Wrapper>
  );
}

const gareDistance = (station, itinerary) => {
  const [lat, long] = station.coordonnées;

  const from = point([
    Number(itinerary.toLongitude),
    Number(itinerary.toLatitude),
  ]);
  const to = point([long, lat]);
  return distance(from, to);
};
