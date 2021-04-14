import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import api from "utils/api";
import SearchContext from "utils/SearchContext";
import ModalContext from "utils/ModalContext";
import useDebounce from "hooks/useDebounce";
import TextInput from "./address/TextInput";
import Suggestions from "./address/Suggestions";

const Wrapper = styled.div`
  position: relative;
  margin: 0 0 1.5rem ${(props) => (props.type === "from" ? "2rem" : "6rem")};
  padding: calc(0.3em + 2px) 0;
  line-height: 1.15;

  ${(props) => props.theme.mq.small} {
    margin: 0 0 ${(props) => (props.type === "from" ? "1.5rem" : "2rem")} 0;
  }
`;
const InputWrapper = styled.div`
  position: absolute;
  z-index: ${(props) => (props.type === "from" ? "101" : "100")};
  top: 0;
  left: 100%;
  width: 33rem;
  background-color: ${(props) => props.theme.colors.quad};
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: 0.75em;
  box-shadow: ${(props) =>
    props.focus
      ? `0 0.5px 12.4px rgba(0, 0, 0, 0.266),
      0 1.3px 22.7px rgba(0, 0, 0, 0.354), 0 3px 36.1px rgba(0, 0, 0, 0.427),
      0 10px 80px rgba(0, 0, 0, 0.62)`
      : `0 0.5px 12.4px rgba(0, 0, 0, 0.15),
    0 1.3px 22.7px rgba(0, 0, 0, 0.22), 0 3px 36.1px rgba(0, 0, 0, 0.3),
    0 10px 80px rgba(0, 0, 0, 0.4)`};
  transition: box-shadow 300ms ease-out;

  ${(props) => props.theme.mq.small} {
    width: calc(
      100vw - ${(props) => (props.type === "from" ? "4rem" : "3rem")}
    );
  }
`;
const Input = styled(TextInput)``;
const Km = styled.div`
  position: absolute;
  top: 100%;
  right: 0.7em;

  span {
    font-size: 0.875rem;

    ${(props) => props.theme.mq.small} {
      font-size: 0.75rem;
    }
  }
`;
const Approximation = styled.span`
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  cursor: pointer;
`;
export default function Address(props) {
  const { km, itinerary, setItinerary } = useContext(SearchContext);
  const { setApproximation } = useContext(ModalContext);
  const [search, setSearch] = useState(itinerary[props.type]);
  const debouncedSearch = useDebounce(search);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      api
        .get(`https://api-adresse.data.gouv.fr/search/?q=${debouncedSearch}`)
        .then((res) => setSuggestions(res.features || []));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const [focus, setFocus] = useState(false);

  let timer = null;

  return (
    <Wrapper className={props.className} type={props.type}>
      <span
        dangerouslySetInnerHTML={{
          __html: `${props.type === "from" ? "de" : "à"}&nbsp;`,
        }}
      />
      <InputWrapper type={props.type}>
        <Input
          name={"address"}
          autoComplete="off"
          value={search}
          onChange={(value) => {
            setSearch(value);
          }}
          onFocus={() => {
            clearTimeout(timer);
            setFocus(true);
          }}
          onBlur={() => {
            clearTimeout(timer);
            timer = setTimeout(() => setFocus(false), 100);
          }}
        />
        <Suggestions
          suggestions={suggestions}
          focus={focus}
          setFocus={(value) => {
            clearTimeout(timer);
            setFocus(value);
          }}
          onChange={(suggestion) => {
            window._paq &&
              window._paq.push([
                "trackEvent",
                "itinerary",
                "change",
                props.type,
              ]);
            setSearch(suggestion.place_name_fr);
            setItinerary({
              [props.type]: suggestion.properties.label,
              [props.type + "Longitude"]: suggestion.geometry.coordinates[0],
              [props.type + "Latitude"]: suggestion.geometry.coordinates[1],
            });
          }}
        />
      </InputWrapper>
    </Wrapper>
  );
}
