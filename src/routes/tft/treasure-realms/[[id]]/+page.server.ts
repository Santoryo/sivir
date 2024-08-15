import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';

// @ts-nocheck
export async function load({ }) {

    const pb = new PocketBase(PUBLIC_POCKETBASE);

    const data: TreasureRealm[] = await pb.collection('treasureRealms').getFullList({sort: '-startDate'});

    const refDate = data[0].startDate;

    const treasureRealms: TreasureRealm[] = data.filter((item) => item.startDate === refDate);

    return {treasureRealms}

}
