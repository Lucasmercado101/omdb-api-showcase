import Head from "next/head";
import { searchMovies } from "../../utils/api";
import { GetStaticProps, GetStaticPaths } from "next";
import MovieCard from "../../components/MovieCard";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const title = params!.movie as string;
  const data = await searchMovies({ title });
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

export default function Home({ movies }: Props) {
  if (!movies) return null;
  const { Search } = movies;
  return (
    <div>
      <Head>
        <title>OMDB Api App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {movies.Search && (
        <Grid>
          {Search.map((movie) => {
            return <MovieCard key={movie.imdbID} data={movie}></MovieCard>;
          })}
        </Grid>
      )}
    </div>
  );
}
