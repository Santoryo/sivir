<script lang="ts">
    // @ts-nocheck

        import SkinCard from '$lib/SkinCard/SkinCard.svelte';
        import moment from 'moment';
        import Meta from '$lib/Meta.svelte';
	import SkinDataCard from '$lib/components/SkinDataCard/SkinDataCard.svelte';
    
        export let data;
        const skins: SaleRotationItem[] = data.saleRotation;


    </script>

    <Meta titleSuffix="LoL Skin Sale: {moment(skins[0].startDate).format('MMM Do')} - {moment(skins[0].endDate).format('MMM Do')}" description={`League of Legends weekly skin sale rotation. ${moment(skins[0].startDate).format('MMM Do')} - ${moment(skins[0].endDate).format('MMM Do')} Sale Rotation. Check out discounts for your favorite league skins. Every week, 15 different skins are put on sale, ranging in value, rarity and discount.`} keywords="lol skin sale, league of legends sale, league skins, lol sale rotation" />
    
    <svelte:head>
        <meta property="article:published_time" content="{skins[0].startDate}">
    </svelte:head>

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

                <SkinDataCard skin={skin.expand.skin} sale={true} saleInfo={skin} />
            
            {/each}

            </div>
        </div>
    
    </div>
    