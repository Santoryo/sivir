export async function load({ }) {
    const champions = await init();
    return {champions};

}

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

    return champions;
}