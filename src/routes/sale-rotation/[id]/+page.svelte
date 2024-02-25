<script>
    // @ts-nocheck

        import SkinCard from '$lib/SkinCard/SkinCard.svelte';
        import moment from 'moment';
        import Meta from '$lib/Meta.svelte';
    
        export let data;
    
        const skins = data.data.skins;
    
    
        const splash = "https://cdn.brelshaza.com/assets/champion-tiles/";

    
    </script>

    <Meta titleSuffix="Sale Rotation" description={`${moment(skins[0].dates.startDate).format('MMM Do')} - ${moment(skins[0].dates.endDate).format('MMM Do')} Sale Rotation`} />
    
    <div class="p-10 flex flex-col">
    

        <div class="text-4xl font-bold uppercase w-fit">Past Sale Rotation
            <div class="text-2xl font-semibold uppercase">
                {moment(skins[0].dates.startDate).format('MMM Do')} - {moment(skins[0].dates.endDate).format('MMM Do')} — {moment(skins[0].dates.endDate).fromNow()}
            </div>
        </div>
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
            {#each skins as skin}

                <a href='/skin/{skin.championId}0{skin.number.toLocaleString('en-US', {minimumIntegerDigits: 2})}'><SkinCard skin={skin} /></a>
            
                {/each}

            </div>
    
        </div>
    
    </div>
    