import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';

// @ts-nocheck
export async function load({ }) {

    const pb = new PocketBase(PUBLIC_POCKETBASE);

    const battlepass: TFTBattlepass[] = await pb.collection('tftBattlepass').getFullList({sort: '-startDate'});

    return {battlepass: battlepass[0]}

}
