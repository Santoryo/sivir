// @ts-nocheck
export async function load({ }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-banners');
    const banners = await temp.json();
    
    return banners
    

}
