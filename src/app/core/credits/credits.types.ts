/* eslint-disable @typescript-eslint/naming-convention */
export interface MovieCredit {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    department?: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character?: string;
    credit_id: string;
    order?: number;
    job?: string;
}

export interface MovieCredits {
    id: number;
    cast: MovieCredit[];
    crew: MovieCredit[];
}
