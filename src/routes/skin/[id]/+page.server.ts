import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';

export async function load({params}) {

    const skin = await init(params.id)
    return skin;

}

async function init(skinID: string) {
    // const response = await fetch(`https://api.brelshaza.com/v3/data/lol-skin/${skinID}`, {method: 'GET'})
    // let skin = await response.json();

    const pb = new PocketBase(PUBLIC_POCKETBASE);

    // if(skin.version.res.length > 0) skin.version.res.reverse();
    const skin = await pb.collection('skins4').getFirstListItem(`skinId="${skinID}" || skinName="${skinID.toString().replace(/-/g, ' ')}"`);
    const mythicShopOccurances = await pb.collection('mythicshop').getFullList({filter: `skin.skinId="${skinID}" || skin.skinName="${skinID.toString().replace(/-/g, ' ')}"`});
    const saleOccurances = await pb.collection('saleRotationItems').getFullList({filter: `skin.skinId="${skinID}" || skin.skinName="${skinID.toString().replace(/-/g, ' ')}"`});
    const wishlistedOccurances = await pb.collection('skins').getFullList({filter: `skin.skinId="${skinID}" || skin.skinName="${skinID.toString().replace(/-/g, ' ')}"`, fields: "id"});
    const wishlistedAmount = wishlistedOccurances.length;

    return {skin, mythicShopOccurances, saleOccurances, wishlistedAmount};

}
