<script lang="ts">
    // @ts-nocheck

        import SkinCard from '$lib/SkinCard/SkinCard.svelte';
        import moment from 'moment';
        import Meta from '$lib/Meta.svelte';
	import SkinDataCard from '$lib/components/SkinDataCard/SkinDataCard.svelte';
    
        export let data;
        const skins: SaleRotationItem[] = data.saleRotation;


    </script>

    <Meta titleSuffix="Sale Rotation" description={`${moment(skins[0].startDate).format('MMM Do')} - ${moment(skins[0].endDate).format('MMM Do')} Sale Rotation`} />
    
    <div class="p-10 flex flex-col" id="container">
    

        <div class="text-4xl font-bold uppercase w-fit" id="title">Current Sale Rotation
            <div class="text-2xl font-semibold uppercase">
                {moment(skins[0].startDate).format('MMM Do')} - {moment(skins[0].endDate).format('MMM Do')} <span id="endsIn">— Ends {moment(skins[0].endDate).fromNow()}</span>
            </div>
        </div>
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
            {#each skins as skin}

                <SkinDataCard skin={skin.expand.skin} />
            
            {/each}

            </div>
        </div>
    
    </div>
    