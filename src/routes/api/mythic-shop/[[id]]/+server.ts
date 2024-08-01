import { pb } from '$lib/pocketbase';
import { json } from '@sveltejs/kit';
import { RecordModel } from 'pocketbase';

export async function GET({ setHeaders, params }) {
    try {

        let options: any = {sort: '-created'}
        if(params.id)
        {
            options = {...options, filter: `patch="${params.id}"`}
        }

        const data = await pb.collection('mythicshop').getFullList(options);
        const patch = data[0].patch;

        setHeaders({
            'Cache-Control': 'public, max-age=8640',
            'Content-Type': 'application/json',
        })

        const response = data.filter((item) => item.patch === patch);

        return json(response);
    }
    catch (error) {
        return json({});
    }
}