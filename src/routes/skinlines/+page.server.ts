export async function load({ }) {
    const champions = await init();
    return {champions};

}

async function init ()
{
    const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skinlines.json', {method: "GET"})
    const data = await res.json();
    let champions: any = [];

    const res1 = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json', {method: "GET"})
    const splashes = await res1.json();

    for (const [key, value] of Object.entries(data))
    {
        for (const [key1, value1] of Object.entries(splashes))
        {
            if(splashes[key1].skinLines && splashes[key1].skinLines[0].id == data[key].id)
            {
                const replace = "/lol-game-data/assets/v1/champion-tiles/"
                champions.push({championId: data[key].id, name: data[key].name, splash: splashes[key1].tilePath.replace(replace, "")});
                break;
            }
        }
    }

    //champions.sort((a: { name: any; }, b: { name: any; }) => a.name.localeCompare(b.name));

    return champions.reverse();
}