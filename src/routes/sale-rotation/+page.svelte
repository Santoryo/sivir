<script>
    // @ts-nocheck

        import SkinCard from '$lib/SkinCard/SkinCard.svelte';
        import moment from 'moment';
    
        export let data;
    
        const skins = data.data.skins;
    
    
        const splash = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/";

    
    </script>
    
    <div class="p-10 flex flex-col">
    

        <div class="text-4xl font-bold uppercase w-fit">Current Sale Rotation
            <div class="text-2xl font-semibold uppercase">
                {moment(skins[0].dates.startDate).format('MMM D')} - {moment(skins[0].dates.endDate).format('MMM Do')} — Ends {moment(skins[0].dates.endDate).fromNow()} 
            </div>
        </div>
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-3 flex-wrap justify-center">
            {#each skins as skin}

                <SkinCard skin={skin} />
            
                {/each}

            </div>
    
        </div>
    
    </div>
    