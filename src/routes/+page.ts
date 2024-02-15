// @ts-nocheck
export async function load({ }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-banners', {headers: {"User-Agent": "Sivir.GG/1.0"}});
    const banners = await temp.json();


    const temp1 = await fetch('https://api.brelshaza.com/v3/data/prime-offers', {headers: {"User-Agent": "Sivir.GG/1.0"}});
    const offers = await temp1.json();

    const temp2 = await fetch('https://api.brelshaza.com/v3/data/lol-newest-skins', {headers: {"User-Agent": "Sivir.GG/1.0"}});
    const skins = await temp2.json();
    
    return {banners, offers, skins}
    

}
