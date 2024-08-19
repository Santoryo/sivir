<script lang="ts">
	// @ts-nocheck
	import SkinCard from '$lib/SkinCard/SkinCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import moment from 'moment';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Meta from '$lib/Meta.svelte';
	import { page } from '$app/stores';
	import SkinDataCard from '$lib/components/SkinDataCard/SkinDataCard.svelte';

	export let data: Champion;
	let champion: Champion = data;

    function name(skinInfo: SkinData) {
    if(skinInfo.formatName == skinInfo.name)
        {
            return skinInfo.formatName + " " + champion.name
        }
        else
        {
            return skinInfo.formatName
        }
    }
</script>

<Meta titleSuffix={champion.name} description={`${champion.name}, ${champion.title} - ${champion.lore}`} image={champion.tilePath} keywords="League of Legends {champion.name}, {champion.title}, lol {champion.name}" />

<svelte:head>
	<meta property="article:published_time" content={champion.created} />
</svelte:head>

{#if champion}

	<div class="p-10 flex flex-col">
		<div class="flex flex-row justify-between flex-wrap items-center gap-4">
			<div class="text-4xl font-bold uppercase w-fit">
				<h1>{champion.name}</h1>
				<div class="text-2xl font-semibold uppercase">
					<h2>{champion.title}</h2>
					last skin - {moment(champion.expand.skins[champion.expand.skins.length - 1].release).fromNow()}
				</div>
			</div>
		</div>

		<div class="text-2xl font-bold uppercase h-4"></div>
		<div class="flex flex-row">
			<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
				{#each champion.expand.skins as skin}
					<SkinDataCard skin={skin} />
				{/each}
			</div>
		</div>
	</div>
{/if}
