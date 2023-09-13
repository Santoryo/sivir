export async function load({params}) {

    const champion = await init(params.id)
    return {champion};

}

async function init(championName: string) {
    const response = await fetch('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json', {mode: 'no-cors', method: 'GET', headers: {'Content-Access-Control-Allow-Origin': '*'}})
    const champions = await response.json();

    const champ: any = Object.keys(champions).find(o => champions[o].name == championName)

    return champions[champ];

}
