export async function load({ }) {
    const champions = await init();
    return {champions};

}

async function init ()
{
    const res = await fetch('https://cdn.sivir.gg/getData?f=champions.json&provider=meraki', {method: "GET"});
    const data = await res.json();
    let champions = [];

    for (const [key, value] of Object.entries(data))
    {
        champions.push({championId: data[key].id, name: data[key].name, price: data[key].price});
    }

    champions.sort((a: { name: any; }, b: { name: any; }) => a.name.localeCompare(b.name));

    return champions;
}