// @ts-nocheck
export async function load({ }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-banners');
    const banners = await temp.json();

    const temp1 = await fetch('https://api.brelshaza.com/v3/data/prime-offers');
    const offers = await temp1.json();

    const temp2 = await fetch('https://api.brelshaza.com/v3/data/lol-newest-skins');
    const skins = await temp2.json();

    
    
    return {banners, offers, skins}
    

}
