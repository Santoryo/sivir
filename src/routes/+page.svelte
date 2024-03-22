<script>
// @ts-nocheck

import emblaCarouselSvelte from 'embla-carousel-svelte'
import Autoplay from 'embla-carousel-autoplay'
export let data;
import Meta from '$lib/Meta.svelte';
import moment from 'moment';
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
		
		<!-- <div class="embla card-hover" use:emblaCarouselSvelte="{{ options, plugins }}" on:emblaInit="{onInit}">
			<div class="embla__container">
		{#each data.banners.banners as banner, i}
			<div class="embla__xd embla__slide" style="background-image: url('https://api.brelshaza.com/v3/banners/{i}.jpg')"></div>
		{/each}
		</div>
		</div> -->

		<div class="text-3xl font-bold w-full h-fit py-4 uppercase">CURRENT EVENTS</div>


		<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
			<div class="card w-full md:w-[350px] mx-2 h-[470px] card-hover rounded-md overflow-hidden relative cursor-pointer">
				<header>
					<img src="./season14.jpg" class="bg-black/50 w-full aspect-[16/9]" alt="Post" />
				</header>
				<div class="p-4 space-y-2">
					<h6 class="h6 opacity-70" data-toc-ignore>Ranked</h6>
					<h3 class="h3 font-semibold" data-toc-ignore>Season 2024 - Split 1</h3>
					<article>
						<p>
							Ranked Season 2024 Split 1 is here! Get ready to climb the ladder and earn rewards.						</p>
					</article>
				</div>
				<footer class="p-4 flex justify-start items-center absolute bottom-0 w-full border-t-[1px] border-white/10">
					<div class="flex-auto flex justify-between items-center">
						<span class="font-light">Ends on <span class="font-semibold">{moment("20240611").format("DD MMM Y")} ({moment("20240611").fromNow()})</span></span>
					</div>
				</footer>
			</div>
		</div>

		<div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
			<div class="card w-full md:w-[350px] mx-2 h-[470px] card-hover rounded-md overflow-hidden relative cursor-pointer">
				<header>
					<img src="https://support-leagueoflegends.riotgames.com/hc/article_attachments/27390867498643" class="bg-black/50 w-full aspect-[16/9]" alt="Post" />
				</header>
				<div class="p-4 space-y-2">
					<h6 class="h6 opacity-70" data-toc-ignore>Periodic Events</h6>
					<h3 class="h3 font-semibold" data-toc-ignore>High Noon 2024</h3>
					<article>
						<p>
							Gunslingers and lawmen ride beneath the merciless sun of the high frontier, chasing survival and salvation in equal measure. Heaven is rubble, hell is empty, and all the devils are here.	</p>
					</article>
				</div>
				<footer class="p-4 flex justify-start items-center absolute bottom-0 w-full border-t-[1px] border-white/10">
					<div class="flex-auto flex justify-between items-center">
						<span class="font-light">Ends on <span class="font-semibold">{moment("20240429").format("DD MMM Y")} ({moment("20240429").fromNow()})</span></span>
					</div>
				</footer>
			</div>
		</div>



    
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
