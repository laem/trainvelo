import { useState, useEffect } from "react";
import styled from "styled-components";
import getStation from "./wikidata";
import Emoji from "components/base/Emoji";

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

const Station = ({ station, onClick }) => {
  const [data, setData] = useState(null);

  const { libelle, commune, distance, uic } = station;

  useEffect(() => {
    getStation(uic.slice(0, -1)).then((json) =>
      setData(json?.results?.bindings[0])
    );
  }, [uic]);

  return (
    <StationVignette key={libelle} onClick={() => onClick(uic)}>
      <div>
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
    </StationVignette>
  );
};

const StationImage = styled.img`
  max-width: 8rem;
`;

export const Stations = ({ gares, count = 3, onClick }) => (
  <StationList>
    {gares.slice(0, count).map((station) => (
      <Station {...{ station, onClick }} />
    ))}
  </StationList>
);
