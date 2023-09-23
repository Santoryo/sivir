<script lang="ts">
import {pb} from "$lib/pocketbase";
    import { Avatar, Tab, TabGroup } from "@skeletonlabs/skeleton";
    import moment from "moment";
    import { onMount } from "svelte";

    export let data;

    let list: any = [];

onMount(async () => {
    list = await pb.collection("ranking").getFullList();
    console.log(list)
})

let tabSet: number = 0;


</script>

<div class="p-10 flex flex-row flex-shrink-0 flex-wrap gap-3 justify-center">

	<section class="w-full md:w-1/4 text-token card p-4 space-y-4 h-[788px]">
		<p class="font-bold">TOP 10 WISHLISTED SKINS</p>
		<ul class="list">
        {#each list as skin (skin)}
        <li class="py-0.5 hover:bg-primary">
            <span class="p-2 h-10 w-10 text-center">{list.indexOf(skin) + 1}</span>
            <a href="/skin/{skin.skinData.id}"><Avatar src={skin.skinData.tilePath.replace("http://", "https://")} width="w-16" rounded="rounded-2xl" /></a>
            <span class="flex-auto"><a href="/skin/{skin.skinData.id}">{skin.id}</a> <br /><span class="opacity-50 text-sm">Wishlisted {skin.total}x times</span></span>
        </li>
            
        {/each}
    </ul>
    </section>

    <section class="w-full md:w-1/4 text-token card p-4 space-y-4 h-[788px]">
		<p class="font-bold pb-4 uppercase">HISTORICAL ROTATIONS <span class="opacity-50 font-regular">(weekly)</span>
            <br> <span class="opacity-50 font-regular text-xs">Data collected since 20 February 2023</span></p>
        <div class="flex flex-col w-full items-center h-[680px] overflow-y-auto">

        {#each data.sales as sale}
        {#if data.sales.indexOf(sale) == 0}
        <a href="/sale-rotation" class="py-0.5 hover:scale-105 smooth bg-"><div class="flex flex-row uppercase font-bold"><div class="w-[70px] text-right pr-2">NOW</div> — <div class="w-[105px] text-left pl-2">{moment(sale.skins[0].dates.endDate).format('D MMM Y')}</div></div></a>
        {:else}
        <a href="/sale-rotation/{sale._id}" class="py-0.5 hover:scale-105 smooth"><div class="flex flex-row uppercase"><div class="w-[70px] text-right pr-2">{moment(sale.skins[0].dates.startDate).format('D MMM')}</div> — <div class="w-[105px] text-left pl-2">{moment(sale.skins[0].dates.endDate).format('D MMM Y')}</div></div></a>
        {/if}
        {/each}
        </div>
    </section>

    <section class="w-full md:w-1/4 text-token card p-4 space-y-4 h-[788px]">
		<p class="font-bold pb-4 uppercase">HISTORICAL MYTHIC SHOPS <span class="opacity-50 font-regular">(every patch)</span>
            <br> <span class="opacity-50 font-regular text-xs">Data collected since 13.17</span></p>
        <div class="flex flex-col w-full items-center h-[680px] overflow-y-auto">

        {#each data.mythics as mythic}
        {#if data.mythics.indexOf(mythic) == 0}
        <a href="/mythic-shop/" class="p-0.5 hover:scale-105 smooth"><div class="flex flex-row uppercase font-bold">{mythic.version.slice(0, -2)} (CURRENT)</div></a>
        {:else}
        <a href="/mythic-shop/{mythic._id}" class="py-0.5 hover:scale-105 smooth"><div class="flex flex-row uppercase">{mythic.version.slice(0, -2)}</div></a>
        {/if}
        {/each}
        </div>
    </section>





</div>