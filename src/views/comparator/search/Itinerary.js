import React, { useContext } from "react";
import styled from "styled-components";
import SearchContext from "utils/SearchContext";

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
  const { itinerary, setItinerary } = useContext(SearchContext);
  return (
    <Wrapper>
      <Start>Mon voyage est-il faisable en train + vélo&nbsp;?</Start>
      <Address type="from" />
      <Address type="to" />
      {itinerary.toLatitude && itinerary.fromLatitude && (
        <BikeDistance {...{ itinerary, setItinerary }} />
      )}
    </Wrapper>
  );
}

const BikeDistance = ({ itinerary, setItinerary }) => (
  <div>
    <label>
      au moins{" "}
      <ShortNumberInput
        type="number"
        onChange={(e) =>
          setItinerary({ ...itinerary, minBikeKm: e.target.value })
        }
        value={itinerary.minBikeKm}
      />{" "}
      km à vélo
    </label>
    <label>
      {" "}
      mais au maximum{" "}
      <ShortNumberInput
        type="number"
        value={itinerary.maxBikeKm}
        onChange={(e) =>
          setItinerary({ ...itinerary, maxBikeKm: e.target.value })
        }
      />{" "}
      km à vélo
    </label>
  </div>
);

const ShortNumberInput = styled.input`
  width: 5.5rem;
`;
