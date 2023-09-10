// @ts-nocheck
export async function load({ }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-sale');
    const skins = await temp.json();
    
    return {
        data: skins
    }
    

}
