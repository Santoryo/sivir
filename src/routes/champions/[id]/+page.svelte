<script lang="ts">
    // @ts-nocheck
    import SkinCard from '$lib/SkinCard/SkinCard.svelte';
    import { createSearchStore, searchHandler } from '$lib/stores/search';
    import moment from 'moment';
    import { onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation'
    import Meta from '$lib/Meta.svelte';

    
    export let data;

    function name(skins) {
        if(skins.formatName == skins.name)
        {
            return skins.formatName + " " + data.champion.name
        }
        else
        {
            return skins.formatName
        }
    }
    
    </script>

<Meta titleSuffix={data.champion.name} description={`${data.champion.name}, ${data.champion.title}`} />

    
    <div class="p-10 flex flex-col">
    
        <div class="flex flex-row justify-between flex-wrap items-center gap-4">
    
            <div class="text-4xl font-bold uppercase w-fit">{data.champion.name}
                <div class="text-2xl font-semibold uppercase">
                    {data.champion.title} <br>
                    last skin - {moment(data.champion.skins[data.champion.skins.length - 1].release).fromNow()}
                </div>
            </div>
    
        </div>
    
    
        <div class="text-2xl font-bold uppercase h-4"></div>
        <div class="flex flex-row">
            <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
            {#each data.champion.skins as skin}
            <a href="/skin/{skin.id}">
            {#if !skin.isBase}
            <div class='frame' style='background-image: url("{skin.tilePath}")'>

                {#if skin.cost == "Special"}

                <span class="absolute bottom-0 skincardinfo text-center">
                    {#if skin.rarity != "NoRarity"}<div class="small-icon" style='background-image: url("/lol/{skin.rarity}.webp")'></div>{/if}
                        {name(skin)} 
                        <br>
                        {#if skin.distribution.includes("Mythic Essence")}
                        <div class="small-icon" style='background-image: url("/lol/ME.webp")'></div> {skin.distribution.replace("Mythic Essence", "")}
                        
                        {:else}

                        {#if skin.rarity != "Mythic"}
                        {skin.distribution}
                        {/if}

                        {/if}

                        </span>
                {:else if skin.rarity != "NoRarity" && skin.price != "Special"}

                <span class="absolute bottom-0 skincardinfo text-center">
                    <div class="small-icon" style='background-image: url("/lol/{skin.rarity}.webp")'>
                    </div> {name(skin)} <br>
                    <div class="small-icon" style='background-image: url("/lol/RP.webp")'></div> {skin.cost}
                </span>

                {:else if skin.rarity == "NoRarity" && skin.price != "Special"}

                <span class="absolute bottom-0 skincardinfo text-center">{name(skin)} <br>
                    <div class="small-icon" style='background-image: url("/lol/RP.webp")'></div> {skin.cost}
                </span>

                {/if}


            </div>
            {/if}
            </a>
            {/each}
    
            </div>
    
        </div>
    </div>