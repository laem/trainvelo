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
    </>
  );
}
