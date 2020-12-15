import React from "react";
import styled from "styled-components";
import { usePalette } from "react-palette";
import Link from "next/link";

// https://colorhunt.co/palette/206818
/*
#ee6f57
#f6f5f5
#1f3c88
#070d59
*/

const Card = styled.article`
  padding: 25px;
  display: inline-block;
  background-color: white;
  border-radius: 15px;
  display: inline-flex; // temp
  flex-direction: column-reverse;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  transition: box-shadow 250ms;
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const StyledTitle = styled.h1`
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 1.2rem;
`;

const StyledPoster = styled.img`
  border-radius: 15px;
  margin-bottom: 10px;
  flex-grow: 1;
  object-position: center;
  object-fit: cover;
`;

const MovieCard: React.FC<{ data: MovieBySearch }> = ({
  data: { Poster, Title, Year, imdbID }
}) => {
  const HQPoster = Poster.replace("300", "900");
  const { data } = usePalette(HQPoster);
  const theresAnImage = Poster !== "N/A";
  return (
    <Card style={{ background: data.darkMuted }}>
      <header>
        <Link href={"/movie/" + imdbID}>
          <StyledTitle style={{ color: data.lightMuted }}>{Title}</StyledTitle>
        </Link>
        <Subtitle style={{ color: data.lightMuted }}>{Year}</Subtitle>
      </header>
      <StyledPoster
        src={theresAnImage ? HQPoster : "/noImage.png"}
        alt={Title}
      />
      {/* {Type} */}
    </Card>
  );
};

export default MovieCard;
