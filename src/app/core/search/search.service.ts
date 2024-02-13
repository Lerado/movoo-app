import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MultiSearchDto } from './search.dto';
import { MultiSearchResultsPagination } from './search.types';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search multiple models in a single request
     *
     * @param params
     */
    search(params: MultiSearchDto): Observable<MultiSearchResultsPagination> {
        return this._httpClient.get<MultiSearchResultsPagination>('@tmdb/search/multi', { params: { ...params } });
    }
}
