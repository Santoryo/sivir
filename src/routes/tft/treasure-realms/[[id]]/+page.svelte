<script lang="ts">
	import Meta from '$lib/Meta.svelte';
	import moment from 'moment';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    export let data;
    const treasureRealms: TreasureRealm[] = data.treasureRealms;

    let value: number = 0;
</script>

<Meta titleSuffix="Treasure Realms" description="Treasure Realms is a gacha system in Teamfight Tactics where you can win Tacticians and Arena Skins. Treasure Realms are similar to other gachas 'banners' rotations." />

<div class="p-10 flex flex-col items-left lg:items-left">
    <div class="text-4xl font-bold uppercase w-fit">
         Current Treasure Realms
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
                        {realm.name}
                    </RadioItem>
                {/each}
            </RadioGroup>
        </div>
    </div>

</div>