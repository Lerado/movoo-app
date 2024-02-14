import { Movie } from "../movie/movie.types";
import { Person } from "../people/people.types";
import { TvShow } from "../tv-show/tv-show.types";

enum MediaType {
    Movie = 'movie',
    Tv = 'tv',
    Person = 'person'
}

type SearchMovieResultAttributes =
    'poster_path' |
    'adult' |
    'overview' |
    'release_date' |
    'original_title' |
    'genre_ids' |
    'id' |
    'original_language' |
    'title' |
    'backdrop_path' |
    'popularity' |
    'vote_count' |
    'video' |
    'vote_average';

type MovieSearchResult = Pick<Movie, SearchMovieResultAttributes> & { media_type: MediaType };

type SearchPersonResultAttributes =
    'profile_path' |
    'adult' |
    'gender' |
    'known_for' |
    'known_for_department' |
    'id' |
    'popularity' |
    'name' |
    'also_known_as';

type PersonSearchResult = Pick<Person, SearchPersonResultAttributes> & { media_type: MediaType };

type SearchTvShowResultAttribute =
    'name' |
    'id';

type TvShowSearchResult = Pick<TvShow, SearchTvShowResultAttribute> & { media_type: MediaType };

type MultiSearchResult = MovieSearchResult | PersonSearchResult;

interface MultiSearchResultsPagination {
    page: number;
    results?: MultiSearchResult[];
    total_pages: number;
    total_results: number;
}

export {
    MultiSearchResultsPagination,
    MultiSearchResult,
    MovieSearchResult,
    PersonSearchResult,
    TvShowSearchResult,
    MediaType
};
