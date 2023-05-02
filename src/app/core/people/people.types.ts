import { Nullable } from "@lib/types"
import { Movie } from "../movie/movie.types";
import { MovieSearchResult, TvShowSearchResult } from "../search/search.types";
import { TvShow } from "../tv-show/tv-show.types";

interface Person {
    birthday: Nullable<string>;
    known_for: Array<MovieSearchResult | TvShowSearchResult>;
    known_for_department: string;
    deathday: Nullable<string>;
    id: number;
    name: string;
    also_known_as: string[];
    gender: PersonGender;
    biography: string;
    popularity: number;
    place_of_birth: Nullable<string>;
    profile_path: Nullable<string>;
    adult: boolean;
    imdb_id: string;
    homepage: Nullable<string>;
}

enum PersonGender {
    'NotSpecified' = 0,
    'Female' = 1,
    'Male' = 2,
    'Other' = 3
}

export { Person, PersonGender };
