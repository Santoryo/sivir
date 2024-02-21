// @ts-nocheck
export async function load({ }) {

    const temp2 = await fetch('https://api.brelshaza.com/v3/data/lol-newest-skins', {headers: {"User-Agent": "Sivir.GG/1.0"}});
    const skins = await temp2.json();
    
    return {skins}
    

}
