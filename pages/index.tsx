import Head from "next/head";
import { searchMovies } from "../utils/api";
import { GetStaticProps } from "next";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

// https://colorhunt.co/palette/206818

export const getStaticProps: GetStaticProps = async () => {
  const data = await searchMovies({ title: "zombieland" });
  return {
    props: { movies: data }
  };
};

type Props = { movies: MoviesBySearch };

const Grid = styled.ul`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  padding: 40px;
`;

export default function Home({ movies: { Search } }: Props) {
  return (
    <div>
      <Head>
        <title>OMDB Api App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {Search && (
        <Grid>
          {Search.map((movie) => {
            return <MovieCard key={movie.imdbID} data={movie}></MovieCard>;
          })}
        </Grid>
      )}
    </div>
  );
}
