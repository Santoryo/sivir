<script>
    // @ts-nocheck

        import Meta from '$lib/Meta.svelte';
        import Skin from '$lib/SkinCard/Skin.svelte';
        import moment from 'moment';
        
    
        export let data;
    
        const skins = data.data.mythic;

        console.log(data.version)
    
    
        const splash = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/";

        const isCurrent = new Date(data.version.date) > Date.now()

    </script>

    <Meta titleSuffix="Mythic Shop Rotation" description={"Mythic Shop Rotation for Patch " + data.version.version} />
    
    <div class="p-10 flex flex-col items-left lg:items-left">
    
        <div class="text-4xl font-bold uppercase w-fit">
            {#if isCurrent} Current {:else} Past {/if}Mythic Shop
            <div class="text-2xl font-semibold uppercase">
                PATCH {data.data.version.slice(0, -2)} — {#if isCurrent} Ends {:else} Ended {/if} {moment(data.version.date).fromNow()} 
            </div>
        </div>
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
            {#each skins as skin}

                {#if skin.type == "SKIN"}
                <a href='/skin/{skin.championId}0{skin.number.toLocaleString('en-US', {minimumIntegerDigits: 2})}'><Skin skin={skin} /></a>
                {:else}
                <Skin skin={skin} />
                {/if}
            
                {/each}

            </div>
    
        </div>
    
    </div>