export interface GetMoviesDto {
    page?: number;
    region?: string;
    language?: string;
}

export interface GetMovieDto {
    language?: string;
    append_to_response?: string;
}

export const getMoviesDtoDefault: GetMoviesDto = {
    page: 1
};
