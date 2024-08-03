import { pb } from '$lib/pocketbase';

// @ts-nocheck
export async function load({ }) {

    const data: TreasureRealm[] = await pb.collection('treasureRealms').getFullList({sort: '-startDate'});

    const refDate = data[0].startDate;

    const treasureRealms: TreasureRealm[] = data.filter((item) => item.startDate === refDate);

    return {treasureRealms}

}
