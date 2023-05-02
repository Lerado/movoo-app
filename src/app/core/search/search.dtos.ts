interface MultiSearchDto {
    query: string;
    page?: number;
    include_adult?: boolean;
    language?: string;
}

const multiSearchDtoDefault: Partial<MultiSearchDto> = {
    page: 1
};

export { MultiSearchDto, multiSearchDtoDefault };
