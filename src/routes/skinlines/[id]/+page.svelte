<script lang="ts">

    import SkinCard from '$lib/SkinCard/SkinCard.svelte';
    import { createSearchStore, searchHandler } from '$lib/stores/search';
    import moment from 'moment';
    import { onDestroy } from 'svelte';
    import Meta from '$lib/Meta.svelte';
    
    export let data;
 
    let keywords = `League of Legends, skinlines, ${data.skins.skinline.name}`;

    for(const skin of data.skins.skins)
    {
        keywords += `, ${skin.name}`;
    }

    </script>
    
    <Meta titleSuffix="{data.skins.skinline.name} Skinline" 
    description={data.skins.skinline.description} 
    image={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/" 
    + data.skins.skins[0].tilePath.replace("/lol-game-data/assets/v1/champion-tiles/", "")}
    keywords={keywords}
    />
    
    
    <div class="p-10 flex flex-col">
    
        <div class="flex flex-row justify-between flex-wrap items-center gap-4">
    
        <div class="text-4xl font-bold uppercase w-fit"><h1>{data.skins.skinline.name}</h1>
            <h2 class="text-xl font-semibold uppercase">
                {data.skins.skinline.description}
            </h2>
        </div>
    
        </div>
    
    
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
            {#each data.skins.skins as champion}
    
                <a href="/skin/{champion.id}"><SkinCard skin={champion} type={"skinlineone"} /></a>
            
            {/each}
    
            </div>
    
        </div>
    </div>
    