import { useState, useEffect } from "react";
import styled from "styled-components";
import getStation from "./wikidata";
import Emoji from "components/base/Emoji";
import { getTrips } from "./trips.js";

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
  cursor: pointer;
`;

const StationList = styled.ul`
  list-style-type: none;
`;

const Station = ({ station, onClick, searchTripsFor }) => {
  const [data, setData] = useState(null);
  const [trips, setTrips] = useState(null);

  const { libelle, commune, distance, uic } = station;

  useEffect(() => {
    getStation(uic.slice(0, -1)).then((json) =>
      setData(json?.results?.bindings[0])
    );

    getTrips(searchTripsFor).then((json) => setTrips(json));
  }, [uic]);

  if (trips && trips.journeys) console.log(trips.journeys);

  return (
    <StationVignette key={libelle} onClick={() => onClick(uic)}>
      <div>
        <Emoji e="🚉" />
        &nbsp;
        <strong>{libelle}</strong>
        <div>
          <Emoji e="E244" />
          {Math.round(distance)} km <Emoji>🕊️</Emoji>
        </div>
        <div>
          {commune.toUpperCase() !== libelle.toUpperCase() && (
            <span>
              <Emoji e="E203" alt="village"></Emoji>&nbsp;
              {commune}
            </span>
          )}
        </div>
      </div>
      <div>{data?.pic && <StationImage src={data.pic.value} />}</div>
      <div>JSON.stringify(trips)</div>
    </StationVignette>
  );
};

const StationImage = styled.img`
  max-width: 8rem;
`;

export const Stations = ({ gares, count = 3, onClick, searchTripsFor }) => (
  <StationList>
    {gares.slice(0, count).map((station) => (
      <Station {...{ station, onClick, searchTripsFor }} />
    ))}
  </StationList>
);
