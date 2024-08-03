import { pb } from '$lib/pocketbase';

// @ts-nocheck
export async function load({ }) {

    const battlepass: TFTBattlepass[] = await pb.collection('tftBattlepass').getFullList({sort: '-startDate'});

    return {battlepass: battlepass[0]}

}
