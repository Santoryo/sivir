import moment from 'moment';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE } from '$env/static/public';

export async function GET() {

    const pb = new PocketBase(PUBLIC_POCKETBASE);

    let xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
        |URLELEMENTS|
    </urlset>`


    const champions: Champion[] = await pb.collection('champions4').getFullList();
    let urlelements = "";

    const skins: Skin[] = await pb.collection('skins4').getFullList({fields: "skinName,updated"});

    urlelements += `
    <url>
        <loc>https://sivir.gg/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://sivir.gg/sale-rotation</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://sivir.gg/mythic-shop</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://sivir.gg/mythic-shop</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://sivir.gg/champions</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://sivir.gg/skinlines</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://sivir.gg/stats</loc>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://sivir.gg/discord</loc>
        <changefreq>weekly</changefreq>
        <priority>0.2</priority>
    </url>
    <url>
        <loc>https://sivir.gg/policies/privacy-policy</loc>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
    </url>
    <url>
        <loc>https://sivir.gg/policies/terms-of-use</loc>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
    </url>
    <url>
        <loc>https://sivir.gg/ads.txt</loc>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
    </url>
    <url>
        <loc>https://sivir.gg/event-shop</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    `


    for(const champion of champions) {
        urlelements += `
        <url>
            <loc>https://sivir.gg/champions/${encodeURIComponent(champion.key)}</loc>
            <lastmod>${moment(champion.updated).format("YYYY-MM-DD")}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
        </url>
        `
    }

    for(const skin of skins) {
        urlelements += `
        <url>
            <loc>https://sivir.gg/skin/${encodeURIComponent(skin.skinName.replaceAll(" ", "-"))}</loc>
            <lastmod>${moment(skin.updated).format("YYYY-MM-DD")}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.4</priority>
        </url>
        `
    }


	return new Response(xml.replace("|URLELEMENTS|", urlelements).trim(),
		{
			headers: {
				'Content-Type': 'application/xml',
			},
		},
	);
}