import moment from 'moment'
export async function load({ params }) {

    const response = await fetch(`https://api.brelshaza.com/v3/data/lol-schedule`, { mode: 'no-cors', method: 'GET', headers: { 'Content-Access-Control-Allow-Origin': '*' } })
    const schedule = await response.json();

    const first = moment().subtract(15, 'days');
    let mythics: any = {}

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 15);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 30);

    const filteredVersions = schedule.filter((item: { date: string | number | Date; }) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    for (const version of filteredVersions) {
        if (!mythics.hasOwnProperty(moment(version.date).format("DD-MM-YYYY"))) {
            mythics[moment(version.date).format("DD-MM-YYYY")] = [
                {
                    name: "<b>Mythic Shop Rotation</b> / " + version.version,
                    durationInHours: 336,
                    color: "purple",
                    startHour: 1,
                    row: 1,
                    startDate: moment(version.date).format(),
                    endDate: moment(version.date).add(336, 'hours').format(),
                    img: "./mythic.jpg"
                }
            ];
        }
    }

    //

    const response1 = await fetch(`https://api.brelshaza.com/v3/data/prime-offers`, { mode: 'no-cors', method: 'GET', headers: { 'Content-Access-Control-Allow-Origin': '*' } })
    const data1 = await response1.json();

    let i = 0;
    for(let offer of data1.prime)
    {
        const diff: number = moment(offer.startDate).diff(first, 'hours')
        if(diff <= 0) {offer.startDate = moment(offer.startDate).add(diff * -1, 'hours')};
        console.log(offer.startDate)
        if(!mythics.hasOwnProperty(moment(offer.startDate).format("DD-MM-YYYY")))
        {
            const hours: number = (moment(offer.date, "MM/DD/YYYY").endOf("day")).diff(moment(offer.startDate), 'hours')
            console.log(moment(offer.startDate).format("D"))

            mythics[moment(offer.startDate).format("DD-MM-YYYY")] = [
                {
                    name: "<b>Prime Gaming:</b> " + offer.title,
                    durationInHours: hours,
                    color: "blue",
                    startHour: 1,
                    row: 2 + i,
                    startDate: moment(offer.startDate).format(),
                    endDate: moment(offer.startDate).add(hours, 'hours').format(),
                    img: offer.img
                }
            ]
        }
        i++;
    }



    return { mythics };


}