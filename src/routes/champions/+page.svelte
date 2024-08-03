<script lang="ts">
	// @ts-nocheck
	import SkinCard from '$lib/SkinCard/SkinCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import moment from 'moment';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Meta from '$lib/Meta.svelte';
	import ChampionCard from '$lib/ChampionCard/ChampionCard.svelte';

	let data: Champion[] = [];
	let searchValue: string = '';

	onMount(async () => {
		const temp = await fetch('/api/champions/none/championId,price,name,tilePath,key');
		data = await temp.json();
	});
</script>

<Meta titleSuffix={'Champions'} description={`All League of Legends champions in the game. There are currently ` + data.length + ' champions.'} />

<div class="flex flex-col p-10">
	<div class="flex flex-row flex-wrap items-center justify-between gap-4">
		<div class="w-fit text-4xl font-bold uppercase">
			Champions
			<div class="text-2xl font-semibold uppercase">
				There are {data.length} champions
			</div>
		</div>

		<input
        class="input autocomplete w-72 h-12 p-2 smooth"
        type="search"
        placeholder="Search for a champion..."
        bind:value={searchValue}
    	/>
	</div>

	<div class="h-4 text-2xl font-bold uppercase"></div>
	<div class="flex flex-row">
		<div class="flex flex-row flex-wrap justify-center gap-2 lg:gap-3">
			{#each data as champion}
				{#if searchValue == '' || champion.name.toLowerCase().replace(" ", "").replace("'", "").includes(searchValue.toLowerCase()) || champion.name.toLowerCase().includes(searchValue.toLowerCase())}
				<a href="/champions/{champion.key}">
					<ChampionCard champion={champion} />
				</a>
				{/if}
			{/each}
		</div>
	</div>
</div>
