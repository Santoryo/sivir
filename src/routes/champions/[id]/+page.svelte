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

	let champion: Champion;

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

	onMount(async () => {
		const temp = await fetch(`/api/champions/key='${$page.params.id}'`);
		const data = await temp.json();
		champion = data[0];
	});
</script>

{#if champion}
	<Meta titleSuffix={champion.name} description={`${champion.name}, ${champion.title}`} />

	<div class="p-10 flex flex-col">
		<div class="flex flex-row justify-between flex-wrap items-center gap-4">
			<div class="text-4xl font-bold uppercase w-fit">
				{champion.name}
				<div class="text-2xl font-semibold uppercase">
					{champion.title}
					<br />
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
