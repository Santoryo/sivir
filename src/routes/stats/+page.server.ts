import { pb } from '$lib/pocketbase';


// @ts-nocheck
export async function load({ }) {

    const saleRotations = await pb.collection('saleRotations').getFullList({sort: '-startDate'});
    const mythicShops = await pb.collection('mythicRotations').getFullList({sort: '-created'});

    return {saleRotations, mythicShops}
    

}
