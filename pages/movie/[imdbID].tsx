import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { searchMovieDetail } from "../../utils/api";
import { usePalette } from "react-palette";
import {
  ExtraDetail,
  HeadingSection,
  InformationItem,
  InformationList,
  MovieCard,
  PImage,
  StyledPlot,
  StyledTitle,
  Subtitle,
  BodyWrapper,
  DetailsWrappers
} from "../../styles/movieDetailsStyles";
import styled from "styled-components";
import SearchBar from "../../components/Searchbar";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const imdbID = params!.imdbID as string;
  const data = await searchMovieDetail(imdbID);
  const thereIsData = "Title" in data;

  if (!thereIsData) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: { movieDetails: thereIsData ? data : null }
  };
};

type Props = {
  movieDetails: MovieDetails;
};

const Placeholder = styled.p`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 3rem;
`;

function name({ movieDetails }: Props) {
  if (!movieDetails) return <Placeholder>Fetching Movie Data</Placeholder>;
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
  const thereIs = (thing: string) => thing !== "N/A";

  return (
    <>
      <Head>
        <title>{Title}</title>
      </Head>
      <MovieCard color={data.darkMuted!}>
        <PImage img={HQPoster} color={data.darkMuted!}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "baseline"
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.8)",
                padding: "10px",
                borderRadius: "15px"
              }}
            >
              <SearchBar />
            </div>
          </div>
          <HeadingSection>
            <StyledTitle color={data.lightMuted!}>
              {Title}
              <Subtitle color={data.lightVibrant!}>{Year}</Subtitle>
            </StyledTitle>
            <InformationList>
              {thereIs(Runtime) && (
                <InformationItem title="runtime" color={data.lightVibrant!}>
                  {Runtime}
                </InformationItem>
              )}
              {thereIs(imdbRating) && (
                <InformationItem title="imdb rating" color={data.lightVibrant!}>
                  {imdbRating}
                </InformationItem>
              )}
              {thereIs(Rated) && (
                <InformationItem title="rating" color={data.lightVibrant!}>
                  {Rated}
                </InformationItem>
              )}
              {thereIs(Type) && (
                <InformationItem title="type" color={data.lightVibrant!}>
                  {Type}
                </InformationItem>
              )}
            </InformationList>
          </HeadingSection>
        </PImage>
        {/* TODO: looks fine on tablet/phone, looks odd when stretched to desktop */}
        <BodyWrapper>
          {thereIs(Plot) && (
            <StyledPlot color={data.lightMuted!}>{Plot}</StyledPlot>
          )}
          <DetailsWrappers>
            {thereIs(Director) && (
              <div>
                <ExtraDetail color={data.lightVibrant!}>Director: </ExtraDetail>
                <ExtraDetail color={data.lightMuted!}>{Director}</ExtraDetail>
              </div>
            )}
            {thereIs(Writer) && (
              <div>
                <ExtraDetail color={data.lightVibrant!}>
                  Writer{Writer.split(",").length > 1 ? "s" : ""}:{" "}
                </ExtraDetail>
                <ExtraDetail color={data.lightMuted!}>{Writer}</ExtraDetail>
              </div>
            )}
            {thereIs(Actors) && (
              <div>
                <ExtraDetail color={data.lightVibrant!}>Actors: </ExtraDetail>
                <ExtraDetail color={data.lightMuted!}>{Actors}</ExtraDetail>
              </div>
            )}
            {thereIs(Released) && (
              <div>
                <ExtraDetail color={data.lightVibrant!}>
                  {" "}
                  Released:{" "}
                </ExtraDetail>
                <ExtraDetail color={data.lightMuted!}>{Released}</ExtraDetail>
              </div>
            )}
            {thereIs(Genre) && (
              <div>
                <ExtraDetail color={data.lightVibrant!}>
                  Genre{Genre.split(",").length > 1 ? "s" : ""}{" "}
                </ExtraDetail>
                <ExtraDetail color={data.lightMuted!}>{Genre}</ExtraDetail>
              </div>
            )}
          </DetailsWrappers>
        </BodyWrapper>
      </MovieCard>
    </>
  );
}

export default name;
