import { json } from '@sveltejs/kit';
import { RecordModel } from 'pocketbase';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';
export async function GET({ setHeaders, params }) {
    try {
        const pb = new PocketBase(PUBLIC_POCKETBASE);

        let options: any = {sort: '-created', expand: "skin"};
        if(params.id)
        {
            options = {...options, filter: `patch="${params.id}"`}
        }

        const data = await pb.collection('mythicshop').getFullList(options);
        const patch = data[0].patch;

        setHeaders({
            'Cache-Control': 'public, max-age=3600',
            'Content-Type': 'application/json',
        })

        const response = data.filter((item) => item.patch === patch);

        return json(response);
    }
    catch (error) {
        return json({});
    }
}