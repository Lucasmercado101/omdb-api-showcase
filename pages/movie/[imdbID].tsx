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
} from "./styles";
import { relative } from "path";

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
    <>
      <Head>
        <title>{Title}</title>
      </Head>
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
        {/* TODO: looks fine on tablet/phone, looks odd when stretched to desktop */}
        <BodyWrapper>
          <StyledPlot color={data.lightMuted!}>{Plot}</StyledPlot>
          <DetailsWrappers>
            <div>
              <ExtraDetail color={data.lightVibrant!}>Director: </ExtraDetail>
              <ExtraDetail color={data.lightMuted!}>{Director}</ExtraDetail>
            </div>
            <div>
              <ExtraDetail color={data.lightVibrant!}>
                Writer{Writer.split(",").length > 1 ? "s" : ""}:{" "}
              </ExtraDetail>
              <ExtraDetail color={data.lightMuted!}>{Writer}</ExtraDetail>
            </div>
            <div>
              <ExtraDetail color={data.lightVibrant!}>Actors: </ExtraDetail>
              <ExtraDetail color={data.lightMuted!}>{Actors}</ExtraDetail>
            </div>
            <div>
              <ExtraDetail color={data.lightVibrant!}> Released: </ExtraDetail>
              <ExtraDetail color={data.lightMuted!}>{Released}</ExtraDetail>
            </div>
            <div>
              <ExtraDetail color={data.lightVibrant!}>
                Genre{Genre.split(",").length > 1 ? "s" : ""}{" "}
              </ExtraDetail>
              <ExtraDetail color={data.lightMuted!}>{Genre}</ExtraDetail>
            </div>
          </DetailsWrappers>
        </BodyWrapper>
      </MovieCard>
    </>
  );
}

export default name;
