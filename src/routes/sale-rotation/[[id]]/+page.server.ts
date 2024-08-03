import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const filter = params.id ? `/${params.id}` : '';
    let fetchResult = await fetch('/api/sale-rotation' + filter);
    let data: SaleRotationItem[] = await fetchResult.json();

    data.sort((a, b) => a.price - b.price);

    return {saleRotation: data};
 }