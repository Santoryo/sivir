// @ts-nocheck
export async function load({ }) {

    const temp = await fetch('https://api.brelshaza.com/v3/data/lol-mythic/');
    let skins = await temp.json();

    const version = await getVersionDate();
    

    skins.mythic.sort((a, b) => {
        return b.price - a.price;
    });

    return {
        maxage: 3600,
        data: skins, version
    }
    

}


async function getVersionDate()
{
    try{
    const dates = await fetch('https://api.brelshaza.com/v3/data/lol-schedule');
    const version = await fetch('https://api.brelshaza.com/v3/data/lol-version');
    const response = await version.json();
    const datesresponse = await dates.json();

    console.log(datesresponse)

    const ver = response.version.slice(0, -2);


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
    catch (err)
    {
        return {
            version: ver,
            date: datesresponse[datesresponse.length - 1].date
        }
    }
}