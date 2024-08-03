import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const filter = params.id ? `/${params.id}` : '';
    let fetchResult = await fetch('/api/mythic-shop' + filter);
    let data = await fetchResult.json();

    console.log(data);
    
    if (!data || data.length === 0) {
		error(404, {
			message: 'Not found',
		});
    }
    return {mythicShop: data};
 }