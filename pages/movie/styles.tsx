import React from "react";
import styled from "styled-components";

type ColorProps = {
  color: string;
};

const smallBreakPoint = 600;
const largeBreakPoint = 1280;

export const MovieCard = styled.div<ColorProps>`
  overflow-y: auto;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ color }) => color};
  position: relative;
  background-position: center;
  background-size: cover;
`;

export const BodyWrapper = styled.div`
  padding: 0 25px 25px 25px;
  margin: auto;
  display: flex;
  @media (max-width: ${largeBreakPoint}px) {
    margin: 0;
    flex-direction: column;
  }
`;

export const PImage = styled.div<{ img: string; color: string }>`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      ${({ color }) => color}
    ),
    url(${(props) => props.img});
  flex-grow: 1;
  background-position: center;
  background-size: cover;
  display: block;
  position: relative;
  display: flex;
  height: 450px;
  min-height: 450px;
`;

export const HeadingSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 25px;
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled.h1<ColorProps>`
  font-size: 3.4em;
  color: ${({ color }) => color};
  margin: auto;
  display: inline;
  padding: 25px;
  padding: 25px 25px 0 25px;
  @media (max-width: ${largeBreakPoint}px) {
    margin: 0;
    font-size: 3em;
  }
  @media (max-width: ${smallBreakPoint}px) {
    font-size: 2.5em;
  }
`;

export const Subtitle = styled.span<ColorProps>`
  font-size: 0.6em;
  margin-left: 10px;
  color: ${({ color }) => color};
  display: inline;
`;

export const InformationList = styled.ul`
  padding: 0 25px 25px 25px;
  margin: auto;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  font-size: 1.1em;
  li + li {
    &:before {
      margin-left: 5px;
      content: "— ";
      color: ${({ color }) => color};
    }
  }
  @media (max-width: ${largeBreakPoint}px) {
    margin: 0;
    font-size: 1em;
  }
  @media (max-width: ${smallBreakPoint}px) {
    font-size: 0.9em;
  }
`;

export const InformationItem = styled.li<ColorProps>`
  font-size: 1.2em;
  text-transform: capitalize;
  color: ${({ color }) => color};
`;

export const StyledPlot = styled.p<ColorProps>`
  font-size: 1.3em;
  max-width: 60ch;
  margin-right: 25px;
  line-height: 1.4;
  color: ${({ color }) => color};
  margin-bottom: 10px;
  @media (max-width: ${largeBreakPoint}px) {
    max-width: 100%;
    font-size: 1.2em;
  }
  @media (max-width: ${smallBreakPoint}px) {
    max-width: 100%;
    font-size: 1.1em;
  }
`;

export const ExtraDetail = styled.small<ColorProps>`
  font-size: 1.1em;
  display: inline;
  color: ${({ color }) => color};
  @media (max-width: ${largeBreakPoint}px) {
    font-size: 1em;
  }
  @media (max-width: ${smallBreakPoint}px) {
    font-size: 0.9em;
  }
`;

export const DetailsWrappers = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70ch;
  * + * {
    margin-top: 5px;
  }
  @media (max-width: ${largeBreakPoint}px) {
    max-width: 700ch;
    * + * {
      margin-top: 0px;
    }
  }
`;
