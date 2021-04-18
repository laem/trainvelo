import { Openmoji } from "@svgmoji/openmoji";
import data from "svgmoji/emoji.json";
import extra from "@svgmoji/openmoji/extra.json";
import styled from "styled-components";

const openmoji = new Openmoji({
  data: [...data, ...extra],
  type: "individual",
});

const Wrapper = styled.span`
  display: inline-block;
  font-style: normal;
  vertical-align: middle;

  img {
    display: block;
    width: auto;
    height: 1em;
    ${({ sizeRem }) => `
    width: ${sizeRem}rem !important;
    height: ${sizeRem}rem !important;
`}
    vertical-align: middle !important;
  }
`;

export default ({ e, sizeRem = 2, children }) => {
  const emoji = e || children;
  const openmojiFound = openmoji.url(emoji);
  return (
    <Wrapper sizeRem={sizeRem}>
      <img alt={emoji} src={openmojiFound} />
    </Wrapper>
  );
};
