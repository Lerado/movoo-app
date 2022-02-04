import { Navigation } from './navigation.types';

export const navigation: Navigation = {

    // Default navigation
    default: [
        {
            id: 'explore',
            title: 'Explore',
            type: 'group',

            children: [
                {
                    id: 'tops',
                    title: 'Tops',
                    type: 'basic',
                    icon: 'heroicons_solid:trending-up',
                    link: '/tops'
                },
                {
                    id: 'genres',
                    title: 'Genres',
                    type: 'basic',
                    icon: 'heroicons_solid:video-camera',
                    link: '/genres'
                }
            ]
        },
    ]
};
