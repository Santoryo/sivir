import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';
import { json } from '@sveltejs/kit';
import { RecordModel } from 'pocketbase';

export async function GET({ setHeaders, params }) {
    try {
        const pb = new PocketBase(PUBLIC_POCKETBASE);

        let options: any = {sort: '-created'}
        if(params.eventId)
        {
            options = {...options, filter: `eventId="${params.eventId}"`}
        }

        const data = await pb.collection('events').getFullList(options);

        setHeaders({
            'Cache-Control': 'public, max-age=8640',
            'Content-Type': 'application/json',
        })

        return json(data[0]);
    }
    catch (error) {
        return json({});
    }
}