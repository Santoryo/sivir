<script lang="ts">
	import Meta from '$lib/Meta.svelte';
	import moment from 'moment';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    export let data;
    const treasureRealms: TreasureRealm[] = data.treasureRealms;

    let value: number = 0;

    let keywords = "Teamfight Tactics Treasure Realms, TFT Treasure Realms, TFT Gacha, TFT Gacha System, TFT Gacha Rotation, TFT Gacha Skins, TFT Gacha Tacticians, TFT Gacha Arena Skins";

    for(const treasureRealm of treasureRealms) {
        keywords += `, ${treasureRealm.name}`;
    }

</script>

<Meta titleSuffix="Treasure Realms" description="Treasure Realms is a gacha system in Teamfight Tactics where you can win Tacticians and Arena Skins. Treasure Realms are similar to other gachas 'banners' rotations."
keywords={keywords} />

<svelte:head>
    <meta property="article:published_time" content={treasureRealms[0].startDate} />
</svelte:head>

<div class="p-10 flex flex-col items-left lg:items-left">
    <div class="text-4xl font-bold uppercase w-fit">
        <h1>Current Treasure Realms</h1>
        <div class="text-2xl font-semibold uppercase">
            {moment(treasureRealms[0].startDate).format('MMMM Do')} — {moment(treasureRealms[0].endDate).format('MMMM Do')}
        </div>
    </div>
    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="flex flex-row w-full h-[800px] relative">
        <img src="//wsrv.nl/?url={treasureRealms[value].image}" class="w-full h-full object-cover" alt="{treasureRealms[value].name}" />
        <div class="absolute mx-auto left-0 right-0 bottom-3 w-fit h-fit">
            <RadioGroup class="flex-col md:flex-row">
                {#each treasureRealms as realm, i}
                    <RadioItem bind:group={value} value={i} name={realm.name} class="mx-1">
                        <h2>{realm.name}</h2>
                    </RadioItem>
                {/each}
            </RadioGroup>
        </div>
    </div>

</div>