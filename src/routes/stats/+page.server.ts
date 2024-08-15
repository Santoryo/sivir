import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';

// @ts-nocheck
export async function load({ }) {

    const pb = new PocketBase(PUBLIC_POCKETBASE);

    const saleRotations = await pb.collection('saleRotations').getFullList({sort: '-startDate'});
    const mythicShops = await pb.collection('mythicRotations').getFullList({sort: '-created'});
    const list = await pb.collection("ranking").getFullList({expand: "skin"});

    return {saleRotations, mythicShops, list}
    

}
