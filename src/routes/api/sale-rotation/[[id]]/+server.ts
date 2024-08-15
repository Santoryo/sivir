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
            options = {...options, filter: `saleId="${params.id}"`}
        }
        else
        {
            const saleId = await pb.collection('saleRotations').getFullList({sort: '-startDate', limit: 1});
            options = {...options, filter: `saleId="${saleId[0].id}"`}
        }

        const response = await pb.collection('saleRotationItems').getFullList(options);

        setHeaders({
            'Cache-Control': 'public, max-age=3600',
            'Content-Type': 'application/json',
        })

        return json(response);
    }
    catch (error) {
        console.error(error);
        return json({});
    }
}