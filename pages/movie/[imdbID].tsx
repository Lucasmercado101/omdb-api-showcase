import { GetStaticProps, GetStaticPaths } from "next";
import { searchMovieDetail } from "../../utils/api";
import { usePalette } from "react-palette";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const imdbID = params!.imdbID as string;
  const data = await searchMovieDetail(imdbID);
  return {
    props: { movieDetails: data }
  };
};

type Props = {
  movieDetails: MovieDetails;
};

type ColorProps = {
  color: string;
};

const MovieCard = styled.div<ColorProps>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ color }) => color};
  position: relative;
  background-position: center;
  background-size: cover;
`;

const PImage = styled.div<{ img: string; color: string }>`
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
  height: 450px;
  width: 100%;
`;

const HeadingSection = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h1<ColorProps>`
  font-size: 3rem;
  color: ${({ color }) => color};
  display: inline-block;
`;

const Subtitle = styled.h2<ColorProps>`
  font-size: 1.5rem;
  margin-left: 10px;
  color: ${({ color }) => color};
  display: inline;
`;

const InformationList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  li + li {
    &:before {
      margin-left: 5px;
      content: "— ";
      color: ${({ color }) => color};
    }
  }
`;

const InformationItem = styled.li<ColorProps>`
  font-size: 1.2rem;
  text-transform: capitalize;
  color: ${({ color }) => color};
`;

const StyledPlot = styled.p<ColorProps>`
  font-size: 1.2rem;
  line-height: 1.4;
  color: ${({ color }) => color};
  margin-bottom: 10px;
`;

const ExtraDetail = styled.small<ColorProps>`
  font-size: 1rem;
  display: block;
  color: ${({ color }) => color};
`;

function name({ movieDetails }: Props) {
  if (!movieDetails) return null;
  const {
    Actors,
    Director,
    Genre,
    Plot,
    Poster,
    Rated,
    Released,
    Runtime,
    Title,
    Type,
    Writer,
    Year,
    imdbRating
  } = movieDetails;

  const HQPoster = Poster.replace("300", "");
  const { data } = usePalette(HQPoster);
  return (
    <MovieCard color={data.darkMuted!}>
      <PImage img={HQPoster} color={data.darkMuted!}>
        <HeadingSection>
          <StyledTitle color={data.lightMuted!}>
            {Title}
            <Subtitle color={data.lightVibrant!}>{Year}</Subtitle>
          </StyledTitle>
          <InformationList>
            <InformationItem title="runtime" color={data.lightVibrant!}>
              {Runtime}
            </InformationItem>
            <InformationItem title="imdb rating" color={data.lightVibrant!}>
              {imdbRating}
            </InformationItem>
            <InformationItem title="rating" color={data.lightVibrant!}>
              {Rated}
            </InformationItem>
            <InformationItem title="type" color={data.lightVibrant!}>
              {Type}
            </InformationItem>
          </InformationList>
        </HeadingSection>
      </PImage>

      <div style={{ padding: "0 25px 50px 25px" }}>
        <StyledPlot color={data.lightMuted!}>{Plot}</StyledPlot>
        <ExtraDetail color={data.lightVibrant!}>
          Director: {Director}
        </ExtraDetail>
        <ExtraDetail color={data.lightVibrant!}>
          Writer{Writer.split(",").length > 1 ? "s" : ""}: {Writer}
        </ExtraDetail>
        <ExtraDetail color={data.lightVibrant!}>Actors: {Actors}</ExtraDetail>
        <ExtraDetail color={data.lightVibrant!}>
          Released: {Released}
        </ExtraDetail>
        <ExtraDetail color={data.lightVibrant!}>
          Genre{Genre.split(",").length > 1 ? "s" : ""}: {Genre}
        </ExtraDetail>
      </div>
    </MovieCard>
  );
}

export default name;
