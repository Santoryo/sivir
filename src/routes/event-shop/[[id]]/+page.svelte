<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Meta from '$lib/Meta.svelte';
	import SkinCard from '$lib/SkinCard/SkinCard.svelte';
	import { pb } from '$lib/pocketbase';
	import moment from 'moment';

	let event: LoLEvent;

	onMount(async () => {
		console.log($page.params.id);
		let url = '/api/event/';

		if($page.params.id)
		{
			url = '/api/event/' + $page.params.id;
		}

		const temp = await fetch(url);
		event = await temp.json();

		console.log(event);
	});
</script>

{#if event}
	<Meta titleSuffix={event.eventName} description="{event.eventName} Event Shop" />

	<div class="p-10 mx-auto">
		<div class="text-4xl font-bold uppercase">{event.eventName}</div>
		<div class="text-2xl font-semibold uppercase">
			{event.eventName} Event Shop
		</div>
		<div class="text-2xl font-semibold uppercase">
			{moment(event.eventStartDate).format("MMM Do")} - {moment(event.eventEndDate).format("MMM Do")} (Shop Closes {moment(event.shopEndDate).format("MMM Do")})
		</div>
		<div class="text-2xl font-bold uppercase h-4"></div>

		<div class="flex flex-row shrink-0 flex-wrap gap-4 content-center items-center justify-center w-full">
			{#each event.shopOffers as category}
				<div class="w-full flex flex-col gap-4">
					<div class="text-2xl font-bold uppercase">{category.category}</div>
					<div class="flex flex-row flex-wrap justify-center gap-2 lg:gap-3">
						{#each category.offers.slice().sort((a, b) => b.price - a.price) as offer}
							<div class="frame bg-center" style="background-image: url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/loot/{offer.image.replace("/lol-game-data/assets/ASSETS/Loot/", "").toLowerCase()}')" >
								<span class="absolute bottom-0 skincardinfo text-center">
                                    {offer.localizedTitle}
                                    <br>
                                    <div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("{pb.files.getUrl(event, event.eventTokenImage)}")'></div> <span class="pr-2">{offer.price}</span>
                                </span>
                            </div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
