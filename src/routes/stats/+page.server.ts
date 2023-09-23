// @ts-nocheck
export async function load({ }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-historical');
    const historical = await temp.json();
    
    return historical
    

}
