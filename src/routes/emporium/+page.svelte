<script lang="ts">
// @ts-nocheck
import { createSearchStore, searchHandler, emporiumSearch } from '$lib/stores/search';
import moment from 'moment';
import { onDestroy, onMount } from 'svelte';
import Meta from '$lib/Meta.svelte';
export let data;
import { SlideToggle, filter } from '@skeletonlabs/skeleton';

const searches = data.champions.map((champion: { name: string; }) => ({
    ...champion,
    searchTerms: `${champion.name.toLowerCase()} ${champion.inventoryType} ${champion.subInventoryType}`,
}));

const searchStore = createSearchStore(searches)
const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
onDestroy(() => {unsubscribe});

let image;
let observer;

let chromas = true;
let all = true;
let loot = true;
let accessories = true;


function selectAll()
{
    all = !all;

    if(all) {
        chromas = true;
        loot = true;
        accessories = true;
    }
}

$: all = accessories && loot && chromas;

let search = '';

let itemsToShow = 250;
let loadMore;

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          itemsToShow += 100;
        }
      });
    });

    observer.observe(loadMore);
  });

  $: if (search) itemsToShow += 100;

</script>

<Meta titleSuffix={"Emporium"} description={`Blue Essence Emporium 2023. There is ` + data.champions.length + " items available in this Emporium Sale."} />



<div class="p-10 flex flex-col">

    <div class="flex flex-row justify-between flex-wrap items-center gap-4">

    <div class="text-4xl font-bold uppercase w-fit"><div class="flex flex-row">Blue Essence Emporium <img src="/lol/BE.png" class="w-8 h-8 ml-2"></div>
        <div class="text-2xl font-semibold uppercase">
            Emporium ended {moment(data.champions[0].sale.endDate).fromNow()}
        </div>
    </div>

        <input
        class="input autocomplete w-72 h-12 p-2 smooth"
        type="search"
        placeholder="Search for a item..."
        bind:value={$searchStore.search}
    />

    </div>

    <div class="w-full h-12 flex flex-row pt-4 gap-5 text-lg">
    <div><SlideToggle name="slider-large" active="bg-primary-500" size="sm" bind:checked={all} on:click={selectAll}>All</SlideToggle></div>
    <div><SlideToggle name="slider-large" active="bg-primary-500" size="sm" bind:checked={accessories}>Accessories</SlideToggle></div>
    <div><SlideToggle name="slider-large" active="bg-primary-500" size="sm" bind:checked={loot}>Loot</SlideToggle></div>
    <div><SlideToggle name="slider-large" active="bg-primary-500" size="sm" bind:checked={chromas}>Chromas</SlideToggle></div>
    </div>

    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="flex flex-row">
        <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
        {#each $searchStore.filtered.slice(0, itemsToShow) as champion}

        {#if champion.subInventoryType == "RECOLOR" && chromas}
        <div class='frame' loading="lazy">
            <img src="https://cdn.brelshaza.com/chromas/{champion.itemId.toString().slice(0, -3)}/{champion.itemId}.webp" loading="lazy" alt="{champion.name}">
            <span class="absolute bottom-0 skincardinfo text-center">{champion.name}
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> {champion.sale.ip} <span class='font-light'></span></span>
        </div>
        {:else if champion.inventoryType == "HEXTECH_CRAFTING" && champion.subInventoryType == "CHEST" && loot}
        <div class='frame' style='background-image: url("{champion.iconUrl}")'>
            <span class="absolute bottom-0 skincardinfo text-center">{champion.name}
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> {champion.sale.ip} <span class='font-light'></span></span>
        </div>
        {:else if champion.inventoryType == "HEXTECH_CRAFTING" && champion.subInventoryType == "CHEST" && loot}
        <div class='frame' style='background-image: url("{champion.iconUrl}")'>
            <span class="absolute bottom-0 skincardinfo text-center">{champion.name}
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> {champion.sale.ip} <span class='font-light'></span></span>
        </div>
        {:else if champion.inventoryType == "EMOTE" && accessories}
        <div class='frame' style='background-image: url("{champion.iconUrl}")'>
            <span class="absolute bottom-0 skincardinfo text-center">{champion.name}
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> {champion.sale.ip} <span class='font-light'></span></span>
        </div>
        {:else if champion.inventoryType == "WARD_SKIN" && accessories}
        <div class='frame' style='background-image: url("http://cdn.brelshaza.com/assets/wardskinimages/{champion.iconUrl.replace("skin", "hero").replace(".jpg", ".png")}")'>
            <span class="absolute bottom-0 skincardinfo text-center">{champion.name}
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> {champion.sale.ip} <span class='font-light'></span></span>
        </div>
        {:else if champion.inventoryType == "REGALIA_BANNER" && accessories}
        <div class='frame' style='background-image: url("{champion.iconUrl}")'>
            <span class="absolute bottom-0 skincardinfo text-center">Blue Essence Emporium 2023 Banner
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> {champion.sale.ip} <span class='font-light'></span></span>
        </div>
        {/if}

        
        {/each}

        {#if accessories}
        <div class='frame' style='background-image: url("https://d392eissrffsyf.cloudfront.net/en/live-banners/2015-04-13_MysteryIcon_Ward_StoreCards/PVP.net.StoreIcon.MysteryIcon.jpg")'>
            <span class="absolute bottom-0 skincardinfo text-center">Mystery Icon
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> 1500 <span class='font-light'></span></span>
        </div>
        <div class='frame' style='background-image: url("https://d392eissrffsyf.cloudfront.net/en/live-banners/2015-04-13_MysteryIcon_Ward_StoreCards/PVP.net.StoreIcon.MysteryWard.jpg")'>
            <span class="absolute bottom-0 skincardinfo text-center">Mystery Ward
                <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/BE.png")'></div> 4900 <span class='font-light'></span></span>
        </div>

        {/if}

        <div bind:this={loadMore}></div>
        </div>

    </div>
</div>
