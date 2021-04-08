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
  const { itinerary } = useContext(SearchContext);

  console.log(itinerary);

  const garesTo = garesProches(gares, itinerary, "to");
  const garesFrom = garesProches(gares, itinerary, "from");
  console.log(garesFrom, garesTo);
  return (
    <Wrapper>
      <p>Voici les gares les plus proches</p>
      <h3>Départ</h3>
      <Gares gares={garesFrom} />
      <h3>Arrivée</h3>
      <Gares gares={garesTo} />
    </Wrapper>
  );
}

const Gares = ({ gares }) => (
  <ul>
    {gares.slice(0, 3).map(({ libelle }) => (
      <li key={libelle}>{libelle}</li>
    ))}
  </ul>
);

const garesProches = (gares, itinerary, toOrFrom) =>
  [...gares].sort(
    (g1, g2) =>
      gareDistance(g1, itinerary, toOrFrom) -
      gareDistance(g2, itinerary, toOrFrom)
  );

const gareDistance = (station, itinerary, toOrFrom) => {
  const [lat, long] = station.coordonnées;

  const attributeLong = toOrFrom + "Longitude";
  const attributeLat = toOrFrom + "Latitude";

  const A = point([
    Number(itinerary[attributeLong]),
    Number(itinerary[attributeLat]),
  ]);
  const B = point([long, lat]);
  return distance(A, B);
};
