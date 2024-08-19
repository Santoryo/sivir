<script lang="ts">

import SkinCard from '$lib/SkinCard/SkinCard.svelte';
import { createSearchStore, searchHandler } from '$lib/stores/search';
import moment from 'moment';
import { onDestroy } from 'svelte';
import Meta from '$lib/Meta.svelte';

export let data;
console.log(data.champions)

const searchStore = createSearchStore(data.champions)

const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

onDestroy(() => {unsubscribe});

</script>

<Meta titleSuffix="Skinlines" description={"All skinlines in League of Legends. There is currently " + data.champions.length + "skinlines"} />


<div class="p-10 flex flex-col">

    <div class="flex flex-row justify-between flex-wrap items-center gap-4">

    <div class="text-4xl font-bold uppercase w-fit"><h1>Skinlines</h1>
        <h2 class="text-2xl font-semibold uppercase">
            There are {data.champions.length} skinlines
        </h2>
    </div>

        <input
        class="input autocomplete w-72 h-12 p-2 smooth"
        type="search"
        placeholder="Search for a skinline..."
        bind:value={$searchStore.search}
    />

    </div>


    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="flex flex-row">
        <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
        {#each $searchStore.filtered as champion}

        <a href="/skinlines/{champion.championId}"><SkinCard skin={champion} type={"skinline"} /></a>
        
        {/each}

        </div>

    </div>
</div>
