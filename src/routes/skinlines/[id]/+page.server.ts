export async function load({params}) {

    const skins = await init(params.id)

    return {skins};

}

async function init(skinlineId: string) {
    const response = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json', {mode: 'no-cors', method: 'GET', headers: {'Content-Access-Control-Allow-Origin': '*'}})
    const allSkins = await response.json();

    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skinlines.json', {method: "GET"})
    const data = await res.json();


    const skinline = data.find((o: any) => o.id == skinlineId);

    let skins: string[] = [];

    Object.keys(allSkins).forEach(element => {
        if(allSkins[element].skinLines && allSkins[element].skinLines[0].id == skinlineId)
        {
            skins.push(allSkins[element])
        }
    })

    return {skins, skinline}

}
