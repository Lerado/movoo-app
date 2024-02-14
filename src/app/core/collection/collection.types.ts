import { Movie } from '../movie/movie.types';

export interface MoviesCollection {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: Movie[];
}
