import React, { useContext } from "react";
import styled from "styled-components";

import SearchContext from "utils/SearchContext";
import ModalContext from "utils/ModalContext";
import Button from "components/base/Button";
import Search from "./comparator/Search";
import Results from "./comparator/Results";

const Buttonwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;
const Disclaimer = styled.p`
  max-width: 30rem;
  margin: 0 auto 1rem;
`;
const Toggle = styled.span`
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  cursor: pointer;
`;
export default function Comparator(props) {
  const { setMode } = useContext(SearchContext);

  const { setConfigurator } = useContext(ModalContext);

  return (
    <>
      <Search iframe={props.iframe} />
      <Results />
      <Disclaimer>La méthode sera décrite ici un jour.</Disclaimer>
      <Disclaimer>
        Lorsque vous ne connaissez pas directement le kilométrage, le{" "}
        <Toggle
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setMode("itinerary");
            window._paq &&
              window._paq.push(["trackEvent", "mode", "change", "itinerary"]);
          }}
        >
          mode itinéraire
        </Toggle>{" "}
        vous permet d'estimer la distance entre deux points. Calculée à vol
        d'oiseau, cette distance est identique pour tous les modes de
        déplacement et ne correspond pas à la réalité des transports disponibles
        sur ce trajet.
      </Disclaimer>
    </>
  );
}
