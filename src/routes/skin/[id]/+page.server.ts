export async function load({params}) {

    const skin = await init(params.id)
    return {skin};

}

async function init(skinID: string) {
    const response = await fetch(`https://api.brelshaza.com/v3/data/lol-skin/${skinID}`, {mode: 'no-cors', method: 'GET', headers: {'Content-Access-Control-Allow-Origin': '*'}})
    const skin = await response.json();


    return skin;

}
