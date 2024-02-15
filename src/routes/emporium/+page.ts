export async function load({ }) {
    const champions = await init();
    return {champions};

}

const typePriority = {
    'EMOTE': 1,
    'HEXTECH_CRAFTING': 2,
    'CHAMPION_SKIN': 3,
    // Add more types as needed
  };

async function init ()
{
    const res = await fetch('https://api.brelshaza.com/v3/data/lol-emporium', {method: "GET"});
    const data = await res.json();
    let champions: any = [];



    for(const obj of data.catalog)
    {
        if(obj.hasOwnProperty('sale'))
        champions.push(obj)
    }
    console.log(champions[0])

    champions.sort((a: { name: any; }, b: { name: any; }) => (a.name || '').localeCompare(b.name || ''));
    const typePriority: { [key: string]: number } = {
        'EMOTE': 2,
        'HEXTECH_CRAFTING': 3,
        'WARD_SKIN': 2,
        'REGALIA_BANNER': 1,
        'CHAMPION_SKIN': 5,
        // Add more types as needed
    };

    champions.sort((a: { inventoryType: string; name: string }, b: { inventoryType: string; name: string }) => {
        const typeA = a.inventoryType;
        const typeB = b.inventoryType;

        // Compare based on type priority
        const typeComparison = typePriority[typeA] - typePriority[typeB];

        // If types have different priorities, use that for sorting
        if (typeComparison !== 0) {
            return typeComparison;
        }

        // If types have the same priority, sort by name
        return (a.name || '').localeCompare(b.name || '');
    });

    return champions;
}