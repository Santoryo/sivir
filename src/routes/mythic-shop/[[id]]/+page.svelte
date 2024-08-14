<script lang="ts">
    // @ts-nocheck

        import Meta from '$lib/Meta.svelte';
        import Skin from '$lib/SkinCard/Skin.svelte';
        import moment from 'moment';
        import { onMount } from 'svelte';
        import { page } from '$app/stores';
	    import SkinDataCard from '$lib/components/SkinDataCard/SkinDataCard.svelte';

        // let data = [];
        export let data;
        const skins: MythicShopItem[] = data.mythicShop;



    </script>

<Meta titleSuffix="LoL Mythic Shop: {skins[0].patch}" description={`League of Legends Mythic Shop rotation for patch ${skins[0].patch}. Check out Mythic Shop rotation for prestige League skins for your favorite champions where you can exchange Mythic Essence into exclusive, valuable skins`} keywords="lol mythic shop, league of legends mythic shop rotation, league skins, lol mythic shop" />
    
    <svelte:head>
        <meta property="article:published_time" content="{skins[0].created}">
    </svelte:head>
    
    <div class="p-10 flex flex-col items-left lg:items-left" id="container">
        <div class="text-4xl font-bold uppercase w-fit">
            <!-- {#if isCurrent} Current {:else} Past {/if}Mythic Shop -->
             Current Mythic Shop
            <div class="text-2xl font-semibold uppercase">
                PATCH {skins[0].patch}
            </div>
        </div>
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
            {#each skins as currentSkin}

                {#if currentSkin.category == "SKIN"}
                <SkinDataCard skin={currentSkin.expand.skin} />
                {/if}
                {/each}

            </div>
    
        </div>
    
    </div>