import React, { useContext } from "react";
import styled from "styled-components";

import SearchContext from "utils/SearchContext";
import ModalContext from "utils/ModalContext";
import Button from "components/base/Button";
import Search from "./comparator/Search";
import Results from "./comparator/Results";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <LogoImage src="/logo.png" />
      </Link>
      <Search iframe={props.iframe} />
      <Results />
    </>
  );
}

const LogoImage = styled.img`
  width: 4rem;
  margin: 0.6rem auto;
  display: block;
`;
