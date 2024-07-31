import { pb } from '$lib/pocketbase';
import { json } from '@sveltejs/kit';
import { RecordModel } from 'pocketbase';

export async function GET({ setHeaders, params }) {
    try {

        let options: any = {sort: '-created'}
        if(params.eventId)
        {
            options = {...options, filter: `eventId="${params.eventId}"`}
        }

        console.log(options);

        const data = await pb.collection('events').getFullList(options);

        // setHeaders({
        //     'Cache-Control': 'public, max-age=8640',
        //     'Content-Type': 'application/json',
        // })

        return json(data[0]);
    }
    catch (error) {
        return json({});
    }
}