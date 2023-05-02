import { MediaType } from 'app/core/search/search.types';

const mediaRoutes: Record<MediaType, string> = {
    'movie': 'movies',
    'person': 'coming-soon', /** @TODO update route with 'people' */
    'tv': 'coming-soon' /** @TODO update route with 'tv-shows' */
}

const mediaNameAttribute: Record<MediaType, string> = {
    'movie': 'title',
    'person': 'name',
    'tv': 'name'
};

export { mediaNameAttribute, mediaRoutes };

/**
 * @TODO
 *
 * Check movie details page with 'Distorted Movi Sion'
 */
