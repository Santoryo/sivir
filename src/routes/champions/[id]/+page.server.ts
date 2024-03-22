export async function load({params}) {

    const champion = await init(params.id)
    return {champion};

}

async function init(championName: string) {
    const response = await fetch('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json')
    const champions = await response.json();

    const champ: any = Object.keys(champions).find(o => champions[o].name.toLowerCase() == championName.toLowerCase())

    return champions[champ];

}
