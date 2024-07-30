import { pb } from '$lib/pocketbase';
import { json } from '@sveltejs/kit';
import { RecordModel } from 'pocketbase';

export async function GET({ setHeaders, params }) {
    try {
        // const temp = await fetch('https://data.brelshaza.com/api/collections/champions4/records?page=1&perPage=999&' + filter)
        // const data = await temp.json();

        let options = {expand: 'skins'};

        if(params.filter && params.filter != "none")
        {
            options = {
                ...options,
                filter: params.filter
            }
        }
        if(params.fields)
        {
            options = {
                ...options,
                fields: params.fields
            }
        }


        const data = await pb.collection('champions4').getFullList(options);

        setHeaders({
            'Cache-Control': 'public, max-age=86400',
            'Content-Type': 'application/json',
        })

        return json(data);
    }
    catch (error) {
        return json({});
    }
}