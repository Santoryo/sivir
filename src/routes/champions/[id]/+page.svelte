<script lang="ts">
	// @ts-nocheck
	import SkinCard from '$lib/SkinCard/SkinCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import moment from 'moment';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Meta from '$lib/Meta.svelte';
	import { page } from '$app/stores';

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
		const temp = await fetch(`/api/champions/name='${$page.params.id}'`);
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
					<a href="/skin/{skin.skinId}">
						{#if !skin.isBase}
							<div class="frame" style="background-image: url('//wsrv.nl/?url={skin.tilePath}')">
								{#if skin.cost == 0}
									<span class="absolute bottom-0 skincardinfo text-center">
										{#if skin.rarity != 'NoRarity'}<div class="small-icon" style="background-image: url('/lol/{skin.rarity}.webp')"></div>{/if}
										{name(skin)}
										<br />
										{#if skin.distribution.includes('Mythic Essence')}
											<div class="small-icon" style="background-image: url('/lol/ME.webp')"></div>
											{skin.distribution.replace('Mythic Essence', '')}
										{:else}
											{skin.distribution}
										{/if}
									</span>
								{:else if skin.rarity != 'NoRarity' && skin.price != 'Special'}
									<span class="absolute bottom-0 skincardinfo text-center">
										<div class="small-icon" style="background-image: url('/lol/{skin.rarity}.webp')"></div>
										{name(skin)}
										<br />
										<div class="small-icon" style="background-image: url('/lol/RP.webp')"></div>
										{skin.cost}
									</span>
								{:else if skin.rarity == 'NoRarity' && skin.price != 'Special'}
									<span class="absolute bottom-0 skincardinfo text-center">
										{name(skin)}
										<br />
										<div class="small-icon" style="background-image: url('/lol/RP.webp')"></div>
										{skin.cost}
									</span>
								{/if}
							</div>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
