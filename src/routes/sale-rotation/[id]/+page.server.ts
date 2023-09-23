// @ts-nocheck
export async function load({ params }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-sale/' + params.id);
    const skins = await temp.json();
    
    return {
        data: skins
    }
    

}
