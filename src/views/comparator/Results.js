import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";

import TransportationContext from "utils/TransportationContext";
import SearchContext from "utils/SearchContext";

import Transportation from "./results/Transportation";
import gares from "../../gares.json";
import { distance, point } from "@turf/turf";
import Emoji from "components/base/Emoji";
import getStation from "./wikidata";

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

  console.log("ITI", itinerary);

  const garesTo = garesProches(gares, itinerary, "to");
  const garesFrom = garesProches(gares, itinerary, "from");
  console.log(garesFrom, garesTo);
  if (!itinerary.fromLatitude || itinerary.fromLatitude === "") {
    return (
      <div>
        Renseignez un départ pour que l'on puisse choisir la gare de départ
      </div>
    );
  }
  if (itinerary.fromLatitude && !itinerary.toLatitude) {
    return (
      <div>
        <h3>📍 Les gares à proximité du départ</h3>
        <Gares gares={garesFrom} count={6} />
      </div>
    );
  }
  return (
    <Wrapper>
      <p>1️⃣ &nbsp;Voici les gares les plus proches</p>
      <h3>Départ</h3>

      <Gares gares={garesFrom} />
      <h3>Arrivée</h3>
      <Gares gares={garesTo} count={20} />
      <p>2️⃣ &nbsp;La suite n'est pas encore implémentée :)</p>
    </Wrapper>
  );
}

const StationVignette = styled.li`
  border: 4px solid ${(props) => props.theme.colors.second};
  background: #ffffff9e;
  margin: 0.6rem;
  box-shadow: 0 1px 3px rgba(41, 117, 209, 0.12),
    0 1px 2px rgba(41, 117, 209, 0.24);
  padding: 0.6rem;
  will-change: box-shadow;
  -webkit-user-select: text;
  user-select: text;
  transition: box-shadow 0.15s, border-color 0.15s;
  border-radius: 0.3rem;
  .emoji {
    font-size: 140%;
  }
  display: flex;
  justify-content: space-between;
`;

const StationList = styled.ul`
  list-style-type: none;
`;

const Station = ({ libelle, commune, distance, uic }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getStation(uic.slice(0, -1)).then((json) =>
      setData(json?.results?.bindings[0])
    );
  }, [uic]);

  return (
    <StationVignette key={libelle}>
      <div>
        <strong>{libelle}</strong>
        <div>
          <Emoji>🚴</Emoji> {Math.round(distance)} km{" "}
        </div>
        <div>
          {commune.toUpperCase() !== libelle.toUpperCase() && (
            <span>
              <Emoji>🏘️ </Emoji>&nbsp;
              {commune}
            </span>
          )}
        </div>
      </div>
      <div>{data?.pic && <StationImage src={data.pic.value} />}</div>
    </StationVignette>
  );
};

const StationImage = styled.img`
  max-width: 8rem;
`;

const Gares = ({ gares, count = 3 }) => (
  <StationList>
    {gares.slice(0, count).map((station) => (
      <Station {...station} />
    ))}
  </StationList>
);

const garesProches = (gares, itinerary, toOrFrom) =>
  gares
    .map((gare) => ({
      ...gare,
      distance: gareDistance(gare, itinerary, toOrFrom),
    }))
    .filter((gare) => {
      return toOrFrom === "to"
        ? gare.distance > +itinerary.minBikeKm &&
            gare.distance < +itinerary.maxBikeKm
        : true;
    })
    .sort((g1, g2) => g1.distance - g2.distance);

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
