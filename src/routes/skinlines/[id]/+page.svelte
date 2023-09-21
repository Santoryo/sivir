<script lang="ts">

    import SkinCard from '$lib/SkinCard/SkinCard.svelte';
    import { createSearchStore, searchHandler } from '$lib/stores/search';
    import moment from 'moment';
    import { onDestroy } from 'svelte';
    import Meta from '$lib/Meta.svelte';
    
    export let data;
    
    </script>
    
    <Meta titleSuffix={data.skins.skinline.name} description={data.skins.skinline.description} />
    
    
    <div class="p-10 flex flex-col">
    
        <div class="flex flex-row justify-between flex-wrap items-center gap-4">
    
        <div class="text-4xl font-bold uppercase w-fit">{data.skins.skinline.name}
            <div class="text-xl font-semibold uppercase">
                {data.skins.skinline.description}
            </div>
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
    