// @ts-nocheck
export async function load({ params}) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-mythic/' + params.id);
    let skins = await temp.json();

    const version = await getVersionDate(skins.version);

    skins.mythic.sort((a, b) => {
        return b.price - a.price;
    });

    return {
        data: skins, version
    }
    

}


async function getVersionDate(version: string)
{
    try{
    const dates = await fetch('https://api.brelshaza.com/v3/data/lol-schedule');
    const datesresponse = await dates.json();

    const ver = version.slice(0, -2);


    for(let i = 0; i < datesresponse.length; i++)
    {
        if(datesresponse[i].version == ver)
        {
            return {
                version: ver,
                date: datesresponse[i+1].date
            }
        }
    }

    }
    catch
    {
        return null;
    }
}