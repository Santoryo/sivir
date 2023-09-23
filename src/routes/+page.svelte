<script>
// @ts-nocheck

import emblaCarouselSvelte from 'embla-carousel-svelte'
import Autoplay from 'embla-carousel-autoplay'
export let data;
import Meta from '$lib/Meta.svelte';
import moment from 'moment';
import name from '$lib/skinName.ts';
    import SkinCard from '$lib/SkinCard/SkinCard.svelte';

let emblaApi  
let options = { loop: true }
  const onInit = (event) => {    
	emblaApi = event.detail    
	console.log(emblaApi.slideNodes()) // Access API  
}

const autoplayOptions = {delay: 10000}

let plugins = [Autoplay(autoplayOptions)]



</script>

<Meta titleSuffix="Home" description={`Sivir.GG - Your ultimate League of Legends companion for mythic shop updates, shop sale rotations, cosmetics, and more.`} />


<div class="p-10 mx-auto">

	<div class="text-4xl font-bold uppercase">Welcome</div>
	<div class="text-2xl font-semibold uppercase">
		Sivir.GG - Your ultimate League of Legends companion for mythic shop updates, shop sale rotations, cosmetics, and more 
	</div>
	<div class="text-2xl font-bold uppercase h-4"></div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex flex-row shrink-0 flex-wrap gap-3 content-center items-center justify-center w-full">
		
		<div class="embla card-hover" use:emblaCarouselSvelte="{{ options, plugins }}" on:emblaInit="{onInit}">
			<div class="embla__container">
		{#each data.banners.banners as banner}
			<div class="embla__xd embla__slide" style="background-image: url('https://{banner.imgUrl.replace('//', '')}')"></div>
		{/each}
		</div>
		</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#each data.offers as offer}
	<a href="{offer.content.externalURL}" target="_blank"><div class="card w-full md:w-[350px] mx-2 h-[470px] card-hover rounded-md overflow-hidden relative cursor-pointer">
		<header>
			<img src="{offer.assets[0].location2x}" class="bg-black/50 w-full aspect-[16/9]" alt="Post" />
		</header>
		<div class="p-4 space-y-2">
			<h6 class="h6" data-toc-ignore>Prime Gaming Offers</h6>
			<h3 class="h3" data-toc-ignore>{offer.title}</h3>
			<article>
				<p>
					{offer.description}
				</p>
			</article>
		</div>
		<footer class="p-4 flex justify-start items-center absolute bottom-0 w-full border-t-[1px] border-white/10">
			<div class="flex-auto flex justify-between items-center">
				<span class="font-light">Ends on <span class="font-semibold">{moment(offer.endTime).format("DD MMM Y")} (in {moment().diff(offer.endTime, 'days') * -1} Days)</span></span>
			</div>
		</footer>
	</div></a>
	{/each}
    
</div>

<div class="text-3xl font-bold w-full h-fit py-4 uppercase">NEWEST SKINS</div>
<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
	{#each data.skins.newest as skin}
		<a href="/skin/{skin.id}"><SkinCard skin={skin} type="homepage" /></a>
	{/each}
</div>

<div class="text-3xl font-bold w-full h-fit py-4 uppercase">UPCOMING SKINS</div>
<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
	{#each data.skins.upcomingSkins as skin}
		<a href="/skin/{skin.id}"><SkinCard skin={skin} type="homepage" /></a>
	{/each}
</div>

</div>
