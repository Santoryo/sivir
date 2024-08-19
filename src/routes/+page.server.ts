import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';
import { ListResult } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ }) => {

    const pb = new PocketBase(PUBLIC_POCKETBASE);

    let fetchResult: ListResult<SkinData[]> = await pb.collection('skins4').getList(1, 20, {sort: '-release', expand: 'skin'});

    const newestSkins: SkinData[] = [];
    const upcomingSkins: SkinData[] = [];

    console.log(fetchResult.items);

    let newestItem;

    for(const skin of fetchResult.items)
    {
        if(skin.availability == "Upcoming")
        {
            upcomingSkins.push(skin);
        }
        else if(skin.release)
        {
            if(newestSkins.length == 0)
            {
                newestSkins.push(skin);
                newestItem = skin.release;
            }
            else
            {
                if(newestItem == skin.release)
                {
                    newestSkins.push(skin);
                }
            }
        }
    }

    return {upcomingSkins, newestSkins};
 }