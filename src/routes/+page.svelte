<script lang="ts">
export let data;
import Meta from '$lib/Meta.svelte';
import moment from 'moment';
import SkinCard from '$lib/SkinCard/SkinCard.svelte';
import { onMount } from 'svelte';
import { pb } from '$lib/pocketbase';
import SkinDataCard from '$lib/components/SkinDataCard/SkinDataCard.svelte';

let yourShop: YourShop;
let lastEvent: LoLEvent;

let amountOfItems = 0;

onMount(async () => {
	yourShop = await pb.collection('yourshops').getFirstListItem("", {sort: "created"});
	const temp = await fetch('/api/event/');
	lastEvent = await temp.json();

	for(const category of lastEvent.shopOffers)
	{
		for(const item of category.offers)
		{
			amountOfItems++;
		}
	}
})





</script>

<Meta titleSuffix="Home" description={`Your ultimate League of Legends database for champion skins, chromas, icons and other cosmetics. Sivir.GG stores all of the skins, chromas, and icons in one place. We also provide you with the latest information on all events, skin sales and Mythic Shop rotations. We also have a dedicated section for Teamfight Tactics Treasure Realms and Battle Pass.`} keywords="league of legends skins, league of legends chromas, new lol skins, lol skins, league events, lol wiki" />


<div class="p-10 mx-auto">

	<h1 class="text-3xl font-bold uppercase">Sivir.GG</h1>
	<h2 class="text-xl font-semibold w-full flex">Your ultimate League of Legends database for champion skins, chromas, icons and other cosmetics. Sivir.GG stores all of the skins, chromas, and icons in one place. We also provide you with the latest information on all events, skin sales and Mythic Shop rotations. We also have a dedicated section for Teamfight Tactics Treasure Realms and Battle Pass.</h2>
	<div class="text-2xl font-bold uppercase h-4"></div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex flex-row shrink-0 flex-wrap gap-3 content-center items-center justify-center w-full">
		
		<!-- <div class="embla card-hover" use:emblaCarouselSvelte="{{ options, plugins }}" on:emblaInit="{onInit}">
			<div class="embla__container">
		{#each data.banners.banners as banner, i}
			<div class="embla__xd embla__slide" style="background-image: url('https://api.brelshaza.com/v3/banners/{i}.jpg')"></div>
		{/each}
		</div>
		</div> -->

		<h3 class="text-3xl font-bold w-full h-fit py-4 uppercase">CURRENT EVENTS</h3>


		{#if yourShop && moment(yourShop.endTime).diff(moment()) > 0 }
		<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
			<div class="card w-full md:w-[350px] mx-2 h-[470px] card-hover rounded-md overflow-hidden relative cursor-pointer">
				<header>
					<img src="//wsrv.nl/?url=https://static.wikia.nocookie.net/leagueoflegends/images/2/24/Your_Shop_Banner.png/revision/latest?cb=20190926181713" class="bg-black/50 w-full aspect-[16/9]" alt="Post" />
				</header>
				<div class="p-4 space-y-2">
					<h6 class="h6 opacity-70" data-toc-ignore>{moment(yourShop.startTime).format("DD MMM Y")}</h6>
					<h3 class="h3 font-semibold" data-toc-ignore>Your Shop</h3>
					<article>
						<p>
							Reveal mystery discounts on skins & champions. See something you like? Be sure to pick it up before time runs out!
						</p>
					</article>
				</div>
				<footer class="p-4 flex justify-start items-center absolute bottom-0 w-full border-t-[1px] border-white/10">
					<div class="flex-auto flex justify-between items-center">
						<span class="font-light">Ends on <span class="font-semibold">{moment(yourShop.endTime).format("DD MMM Y")} ({moment(yourShop.endTime).fromNow()})</span></span>
					</div>
				</footer>
			</div>
		</div>
		{/if}

		{#if lastEvent && moment(lastEvent.eventEndDate).diff(moment()) > 0 }
		<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
			<div class="card w-full md:w-[350px] mx-2 h-[470px] card-hover rounded-md overflow-hidden relative cursor-pointer">
				<header class="relative w-[350px] h-[200px] overflow-hidden">
					<img src="//wsrv.nl/?url={pb.files.getUrl(lastEvent, lastEvent.helpModalImagePath, {thumb: "350x0"})}" class="bg-black/50 scale-150 absolute bottom-0 -translate-y-4" alt="Post" />
				</header>
				<div class="p-4 space-y-2">
					<h6 class="h6 opacity-70" data-toc-ignore>Periodic Events</h6>
					<h3 class="h3 font-semibold" data-toc-ignore>{lastEvent.eventName}</h3>
					<article>
						<p>
							Periodic League of Legends event. Check out <b>{lastEvent.eventName} Event Shop</b>, it features {amountOfItems} items.
						</p>
					</article>
				</div>
				<footer class="p-4 flex justify-start items-center absolute bottom-0 w-full border-t-[1px] border-white/10">
					<div class="flex-auto flex justify-between items-center">
						<span class="font-light">Ends on <span class="font-semibold">{moment(lastEvent.eventEndDate).format("DD MMM Y")} ({moment(lastEvent.eventEndDate).fromNow()})</span></span>
					</div>
				</footer>
			</div>
		</div>
		{/if}



    
</div>

<h3 class="text-3xl font-bold w-full h-fit py-4 uppercase">NEWEST SKINS</h3>
<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
	{#each data.newestSkins as skin}
		<a href="/skin/{skin.skinId}"><SkinDataCard skin={skin} /></a>
	{/each}
</div>

{#if data.upcomingSkins.length > 0}
<h3 class="text-3xl font-bold w-full h-fit py-4 uppercase">UPCOMING SKINS</h3>
<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
	{#each data.upcomingSkins as skin}
		<a href="/skin/{skin.skinId}"><SkinDataCard skin={skin} /></a>
	{/each}
</div>
{/if}

</div>
