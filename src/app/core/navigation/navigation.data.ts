import { Navigation } from './navigation.types';

export const navigation: Navigation = {

    // Explore
    // Complex search parameters
    //      Movies
    //      Watchlists

    // Movies
    //      now playing,
    //      popular,
    //      upcoming,
    //      top rated,
    //      genres

    // Default navigation
    default: [

        // Explore
        {
            id: 'explore',
            title: 'Explore',
            type: 'group',
            // classes: { wrapper: 'pt-[48px]' },

            children: [
                {
                    id: 'explore-movies',
                    title: 'Movies',
                    type: 'basic',
                    icon: 'heroicons_solid:film',
                    link: 'coming-soon/movies/explore'
                    // link: '/movies/explore'
                },
                {
                    id: 'explore-watchlists',
                    title: 'Watchlists',
                    type: 'basic',
                    icon: 'heroicons_solid:view-grid',
                    link: 'coming-soon/watchlists/explorer'
                    // link: '/watchlists/explorer'
                }
            ]
        },

        // Movies
        {
            id: 'movies',
            title: 'Movies',
            type: 'group',

            children: [
                {
                    id: 'movies-now-playing',
                    title: 'Now playing',
                    type: 'basic',
                    icon: 'heroicons_solid:clock',
                    link: '/movies/now-playing'
                },
                {
                    id: 'movies-upcoming',
                    title: 'Upcoming',
                    type: 'basic',
                    icon: 'heroicons_solid:calendar',
                    link: '/movies/upcoming'
                },
                {
                    id: 'movies-popular',
                    title: 'Popular',
                    type: 'basic',
                    icon: 'heroicons_solid:trending-up',
                    link: 'coming-soon/movies/popular'
                    // link: '/movies/popular'
                },
                {
                    id: 'movies-top-rated',
                    title: 'Top rated',
                    type: 'basic',
                    icon: 'heroicons_solid:star',
                    link: 'coming-soon/movies/top-rated'
                    // link: '/movies/top-rated'
                },
                {
                    id: 'movies-genres',
                    title: 'Genres',
                    type: 'basic',
                    icon: 'heroicons_solid:video-camera',
                    link: 'coming-soon/movies/genres'
                    // link: '/movies/genres'
                }
            ]
        }
    ]
};
