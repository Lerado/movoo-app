/* eslint-disable @typescript-eslint/naming-convention */
export interface Movie {
    id: number;
    imdb_id: string;

    title: string;
    tagline: string;
    adult: boolean;
    video: boolean;
    backdrop_path: string;
    poster_path: string;
    original_language: string;
    original_title: string;
    overview: string;
    homepage: string;

    status: MovieStatusType;

    release_date: string;

    popularity: number;

    revenue: number;
    runtime: number;
    budget: number;
    vote_average: number;
    vote_count: number;

    belongs_to_collection: any;
    spoken_languages: SpokenLanguage[];
    genre_ids: number[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
}

export type MovieStatusType = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

export enum MovieStatus {
    'Rumored' = 'Rumored',
    'Planned' = 'Planned',
    'In Production' = 'In Production',
    'Post Production' = 'Post Production',
    'Released' = 'Released',
    'Canceled' = 'Canceled'
}

interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface MoviesPagination {
    page: number;
    dates: { minimum: string; maximum: string };
    results: Movie[];
    total_pages: number;
    total_results: number;
}
