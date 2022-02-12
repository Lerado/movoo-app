// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api: {
        tmdb: {
            path: 'https://api.themoviedb.org/',
            defaultVersion: 3,
            // eslint-disable-next-line max-len
            readAccessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTMxMzUzNGYwMWRlYmQ5ODI0MTA1N2JmODcxMjUxZSIsInN1YiI6IjYxZmVmN2M1MGNlMWJjMDAxYjE2OTFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L0DIqpFei-XyzrYpuM1llufsYVn7DQ6JLO48r-KjOMY'
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
