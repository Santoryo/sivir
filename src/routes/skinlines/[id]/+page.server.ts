export async function load({params}) {

    const skins = await init(params.id)

    return {skins};

}

async function init(skinlineId: string) {
    const response = await fetch('https://cdn.brelshaza.com/json/skins.json', {mode: 'no-cors', method: 'GET', headers: {'Content-Access-Control-Allow-Origin': '*'}})
    const allSkins = await response.json();

    const res = await fetch('https://cdn.brelshaza.com/json/skinlines.json', {method: "GET"})
    const data = await res.json();


    const skinline = data.find((o: any) => o.id == skinlineId);

    let skins: any = [];

    Object.keys(allSkins).forEach(element => {
        if(allSkins[element].skinLines && allSkins[element].skinLines[0].id == skinlineId)
        {
            skins.push(allSkins[element])
        }
    })

    return {skins, skinline}

}
