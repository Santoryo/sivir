export async function load({params, url}) {

  let page = url.searchParams.get('page');
  let filter = url.searchParams.get('filter');

  if(page && parseInt(page) <= 1)
  {
    page = "1";
  }

  const icons = await init(page);
  return {icons: icons[0], length: icons[1], page: page ? parseInt(page) : 1};

}

async function init (page: string | null, filter: string | null)
{
  const res = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-icons.json', {method: "GET"});
  const data = await res.json();
  data.sort((a: { yearReleased: number; }, b: { yearReleased: number; }) => b.yearReleased - a.yearReleased);


  if(filter)
  {
    return [data.filter((icon: { title: string; }) => icon.title.toLowerCase().includes(filter.toLowerCase())).slice(0, 100), data.filter((icon: { title: string; }) => icon.title.toLowerCase().includes(filter.toLowerCase())).length]
  }

  if(page)
  {
    return [data.slice((parseInt(page) - 1) * 100, parseInt(page) * 100), data.length]
  }
  else
  {
    return [data.slice(0, 100), data.length]
  }

  return data;
}