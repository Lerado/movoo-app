export interface GetMoviesDto {
    page?: number;
    region?: string;
    language?: string;
}

export const getMoviesDtoDefault: GetMoviesDto = {
    page: 1
};
