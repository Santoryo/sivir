export async function load({params}) {

    const skin = await init(params.id)
    return {skin};

}

async function init(skinID: string) {
    const response = await fetch(`https://api.brelshaza.com/v3/data/lol-skin/${skinID}`, {method: 'GET'})
    let skin = await response.json();

    if(skin.version.res.length > 0) skin.version.res.reverse();

    return skin;

}
