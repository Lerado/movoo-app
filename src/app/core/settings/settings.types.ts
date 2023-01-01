interface Region {
    iso_3166_1: string;
    english_name: string
}

interface Language {
    iso_639_1: string;
    english_name: string;
    name: string
}

interface Timezone {
    iso_639_1: string;
    zones: string[]
}

interface Settings {
    region?: string,
    language?: string,
    timezone?: string
}

const defaultSettings: Settings = {
    region: 'US'
}

export { Region, Language, Timezone, Settings, defaultSettings };
