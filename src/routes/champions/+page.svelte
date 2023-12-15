<script lang="ts">
// @ts-nocheck
import SkinCard from '$lib/SkinCard/SkinCard.svelte';
import { createSearchStore, searchHandler } from '$lib/stores/search';
import moment from 'moment';
import { onDestroy } from 'svelte';
import { goto } from '$app/navigation'
  import Meta from '$lib/Meta.svelte';

export let data;

const namesArray = data.champions.map(champion => champion.name)

const searchStore = createSearchStore(data.champions)

const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

onDestroy(() => {unsubscribe});

console.log(data.champions)



</script>

<Meta titleSuffix={"Champions"} description={`All League of Legends champions in the game. There are currently ` + data.champions.length + " champions."} />



<div class="p-10 flex flex-col">

    <div class="flex flex-row justify-between flex-wrap items-center gap-4">

    <div class="text-4xl font-bold uppercase w-fit">Champions
        <div class="text-2xl font-semibold uppercase">
            There are {data.champions.length} champions
        </div>
    </div>

        <input
        class="input autocomplete w-72 h-12 p-2 smooth"
        type="search"
        placeholder="Search for a champion..."
        bind:value={$searchStore.search}
    />

    </div>


    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="flex flex-row">
        <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
        {#each $searchStore.filtered as champion}

            <div on:click={() => {goto(`/champions/${champion.name}`)}}><SkinCard skin={champion} type={"champion"} /></div>
        
        {/each}

        </div>

    </div>
</div>
