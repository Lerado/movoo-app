/* eslint-disable @typescript-eslint/naming-convention */
export interface MovieImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface MovieImages {
    id: number;
    backdrops: MovieImage[];
    logos: MovieImage[];
    posters: MovieImage[];
}
