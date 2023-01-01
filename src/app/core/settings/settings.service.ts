import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Region, Language, Timezone, Settings, defaultSettings } from './settings.types';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    readonly regions$ = this._httpClient.get<Region[]>('@tmdb/configuration/countries').pipe(shareReplay());
    readonly languages$ = this._httpClient.get<Language[]>('@tmdb/configuration/languages').pipe(shareReplay());
    readonly timezones$ = this._httpClient.get<Timezone[]>('@tmdb/configuration/timezones').pipe(shareReplay());

    readonly STORAGE_KEY: string = 'settings';

    private readonly _settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(this._getInitialSettings());

    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get settings$(): Observable<Settings> {
        return this._settings.asObservable();
    }

    private set settings(value: Settings) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
        this._settings.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    updateSettings(settings: Settings): void {
        const currentSettings = this._settings.getValue();
        const nextSettings: Settings = { ...currentSettings, ...settings };
        this.settings = nextSettings;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _getInitialSettings(): Settings {
        const userSettings: Settings = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) ?? {};
        return Object.assign({ ...defaultSettings }, userSettings);
    }
}
