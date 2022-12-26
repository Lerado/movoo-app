/* eslint-disable @typescript-eslint/naming-convention */
export interface MovieVideo {
    iso_638_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: number;
}

export interface MovieVideos {
    id: number;
    results: MovieVideo[];
}
