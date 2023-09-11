<script>
// @ts-nocheck

import emblaCarouselSvelte from 'embla-carousel-svelte'
import Autoplay from 'embla-carousel-autoplay'
export let data;

let emblaApi  
let options = { loop: true }
  const onInit = (event) => {    
	emblaApi = event.detail    
	console.log(emblaApi.slideNodes()) // Access API  
}

const autoplayOptions = {delay: 10000}

let plugins = [Autoplay(autoplayOptions)]



</script>

<div class="p-10">

	<div class="text-4xl font-bold uppercase">Welcome</div>
	<div>Brelshaza.com - Your ultimate League of Legends companion for mythic shop updates, shop sale rotations, cosmetics, and more.</div>
    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="flex flex-row">

		<div class="embla" use:emblaCarouselSvelte="{{ options, plugins }}" on:emblaInit="{onInit}">
			<div class="embla__container">
		{#each data.banners as banner}
			<div class="embla__xd embla__slide" style="background-image: url('https://{banner.imgUrl.replace('//', '')}')"></div>
		{/each}
		</div>
	</div>
    
</div>

</div>
