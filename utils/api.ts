import axios from "axios";

axios.defaults.baseURL = `http://www.omdbapi.com/`;

export const searchMovies = (obj: SearchProps) => {
  return axios
    .get<MovieBySearch>(`?apikey=${process.env.OMDB_API_KEY}&s=${obj.title}`)
    .then((resp) => resp.data);
};

export const searchMovieDetail = (id: string) => {
  return axios
    .get<MovieDetails>(`?apikey=${process.env.OMDB_API_KEY}&i=${id}&plot=full`)
    .then((resp) => resp.data);
};
