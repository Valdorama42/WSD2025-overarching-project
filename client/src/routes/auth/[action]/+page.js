import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
    if (params.action !== 'login' && params.action !== 'register') {
        throw error(404, 'Not Found');
    }

    return params;
};