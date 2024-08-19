<script lang="ts">
	import moment from 'moment';
	import Meta from '$lib/Meta.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { pb, currentUser, getWishlist } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';

	const toastStore = getToastStore();
	export let data;
	let likeStatus = false;
	const info: SkinData = data.skin;
	let _skin: any;

	onMount(async () => {
		try {
			await assignSkinVariable();
			_skin ? (likeStatus = true) : (likeStatus = false);
		} catch {
			likeStatus = false;
		}

		console.log(likeStatus);
	});

	onDestroy(() => {
		toastStore.clear();
	});

	async function assignSkinVariable() {
		const wishlist = await getWishlist();
		_skin = wishlist.find((o: { name: any }) => o.name == info.skinName);
	}

	function timestamp(_id: { toString: () => string }) {
		const ts = _id.toString().substring(0, 8);
		const date = new Date(parseInt(ts, 16) * 1000);
		return date;
	}

	function eachString(array: any[]) {
		let res = '';
		array.forEach((element) => {
			res += element + ', ';
		});
		return res.slice(0, -2);
	}

	async function like() {
		if (likeStatus == false) {
			try {
				const data = {
					name: info.skinName,
					skinData: info,
					user: $currentUser?.id,
					skin: info.id
				};

				await pb.collection('skins').create(data);
				likeStatus = !likeStatus;
			} catch {
				toastStore.trigger({ message: "You've reached max skins on your wishlist", background: 'variant-filled-error' });
				return null;
			}
			await assignSkinVariable();
		} else {
			await assignSkinVariable();
			await pb.collection('skins').delete(_skin.id);
			likeStatus = !likeStatus;
		}

		const t = {
			message: likeStatus ? `<b>${info.skinName}</b> has been added to your wishlist!` : `<b>${info.skinName}</b> has been removed from your wishlist!`,
			background: likeStatus ? 'variant-filled-success' : 'variant-filled-error'
		};

		toastStore.trigger(t);
	}

    const description = `${info.cost > 0 ? `Cost: ${info.cost} RP` : `Distribution: ${info.distribution}`} ${info.lore ? `- ${info.lore}` : ''}`;
</script>

<Meta titleSuffix={info.skinName} description={`Cost: ${info.cost} ${info.lore}`} image="//wsrv.nl/?url={info.tilePath}" keywords="{info.skinName}, {info.championName} skins, {info.set.length > 0 ? info.set[0] : ""}" />

<svelte:head>
    <meta property="article:published_time" content="{info.release}" />
</svelte:head>

<Toast></Toast>

<div class="p-10 flex flex-row gap-3 flex-wrap justify-left items-start">
	<div class="w-full h-full max-w-[288px] max-h-[288px] aspect-square md:h-72 md:w-72 bg-cover relative flex justify-center uppercase font-semibold skincard rounded-md border border-gray-800 hover:border-gray-600 smooth text-white;" style="background-image: url('//wsrv.nl/?url={info.tilePath}')"></div>

	<div class="text-3xl font-bold uppercase h-full w-[800px] pt-2 flex-wrap grow-0 break-all">
		{#if info.rarity != 'NoRarity'}<div class="h-[30px] w-[30px] bg-cover inline-block bg-center" style="background-image: url('/lol/{info.rarity}.webp')"></div>{/if}
		<h1>{info.skinName}</h1>

		<h2>
			{#if !info.isBase}
				{#if info.rarity == 'Special'}
					{#if info.distribution.includes('Mythic Essence')}
						<div class="big-icon" style="background-image: url('/lol/ME.webp')"></div>
						{info.distribution.replace('Mythic Essence', '')}
					{:else if info.rarity != 'Mythic'}
						{info.distribution}
					{/if}
				{:else if info.rarity != 'NoRarity' && info.cost != 0}
					<div class="big-icon" style="background-image: url('/lol/RP.webp')"></div>
					{info.cost}
				{:else if info.rarity == 'NoRarity' && info.cost != 0}
					<div class="big-icon" style="background-image: url('/lol/RP.webp')"></div>
					{info.cost}
				{:else if info.distribution != ''}
					<div class="text-regular">{info.distribution}</div>
				{/if}
			{/if}
		</h2>

		<div class="text-xl italic font-semibold uppercase flex flex-col">
			{#if info.skinId == 245056 || info.skinId == 202037 || info.skinId == 64052}
				<span class="text-red-500 font-bold not-italic">Mythic Scam</span>
			{/if}
			<h3 class="not-italic">{moment(info.release).isValid() ? 'Release date: ' + moment(info.release).format('D MMM Y') : 'SKIN COMING SOON'}</h3>
			{#if info.chromas.length > 0}<div>
					<div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/chromas.webp')"></div>
					{info.chromas.length} chromas
				</div>{/if}
			{#if info.set[0]}<div>
					<div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/set.png')"></div>
					<span class="text-xl font-semibold">{info.set[0]}</span>
				</div>{/if}
			<br />
			{#if info.splashArtist.length > 0}<div>
					<div class="h-[15px] w-[15px] bg-cover bg-center inline-block shadow-lg" style="background-image: url('/lol/artist.png')"></div>
					{eachString(info.splashArtist)}
				</div>{/if}
			{#if info.newEffects}<div>
					<div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/effects.png')"></div>
					 New Effects
				</div>{/if}
			{#if info.newAnimations}<div>
					<div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/animations.png')"></div>
					 New Animations
				</div>{/if}
			{#if info.newRecall}<div>
					<div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/recall.png')"></div>
					 New Recall
				</div>{/if}
			{#if info.newQuotes}<div>
					<div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/actor.png')"></div>
					 New Quotes
				</div>{/if}
		</div>
	</div>

	<div class="text-2xl font-bold uppercase w-[350px] pt-2">
		Sale Occurrences
		<div class="w-full h-24 text-base font-semibold flex flex-col gap-1 overflow-y-auto">
			{#if data.saleOccurances.length > 0}
				<div class="h-5 w-full flex flex-row p-1">
					<div class="w-1/2">Date</div>
					<div class="w-1/2">Time since</div>
				</div>
				{#each data.saleOccurances as sale}
					<a href="/sale-rotation/{sale.saleId}">
						<div class="h-5 w-full flex flex-row p-1">
							<div class="w-1/2">{moment(sale.startDate).format('Do MMM YYYY')}</div>
							<div class="w-1/2">{moment(sale.startDate).fromNow(true)}</div>
						</div>
					</a>
				{/each}
			{:else if data.mythicShopOccurances.length > 0}
				<div class="h-5 w-full flex flex-row p-1">
					<div class="w-1/2">Patch</div>
					<div class="w-1/2">Time since</div>
				</div>
				{#each data.mythicShopOccurances as sale}
					<a href="/mythic-shop/{sale.patch}">
						<div class="h-5 w-full flex flex-row p-1">
							<div class="w-1/2">{sale.patch}</div>
							<div class="w-1/2">{moment(sale.created).fromNow(true)}</div>
						</div>
					</a>
				{/each}
			{:else}
				<div class="h-5 w-full flex flex-row italic text-sm">This skin wasn't in sale / mythic shop yet.</div>
			{/if}
		</div>

		<div class="mt-3">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if $currentUser}
				<span class="chip variant-soft hover:variant-filled w-full px-4 py-2 text-sm" on:click={like}>
					{#if likeStatus == false}
						<Fa icon={faHeart} />
						<span>Add to Wishlist</span>
					{:else}
						<Fa icon={faHeartCrack} />
						<span>Remove from Wishlist</span>
					{/if}
				</span>
			{:else}
				<span class="chip variant-soft hover:variant-filled w-full px-2 py-2 text-sm">
					<a href="/account"><span>Sign In to wishlist</span></a>
				</span>
			{/if}
		</div>
	</div>

	<div class="uppercase w-full font-semibold">
		<Accordion autocollapse>
			{#if info.chromas.length > 0}
				<AccordionItem open>
					<svelte:fragment slot="lead"><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/chromas.webp')"></div></svelte:fragment>
					<svelte:fragment slot="summary">CHROMAS</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="w-full flex flex-row flex-wrap justify-center gap-2">
							{#each info.chromas as chroma}
								<div class="bg-contain bg-no-repeat skincard rounded-md border border-gray-800 hover:border-gray-600 smooth text-white relative frame" style="background-image: url({chroma.chromaPath})"><span class="absolute bottom-0 skincardinfo text-center">{chroma.name}</span></div>
							{/each}
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/if}
			<AccordionItem>
				<svelte:fragment slot="lead"><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/splash.png')"></div></svelte:fragment>
				<svelte:fragment slot="summary">SPLASH ART</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="w-full aspect-video bg-cover bg-center" style="background-image: url(//wsrv.nl/?url={info.uncenteredSplashPath})"></div>
				</svelte:fragment>
			</AccordionItem>
			{#if info.lore}
				<AccordionItem>
					<svelte:fragment slot="lead"><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style="background-image: url('/lol/lore.png')"></div></svelte:fragment>
					<svelte:fragment slot="summary">DESCRIPTION</svelte:fragment>
					<svelte:fragment slot="content"><span class="normal-case">{info.lore}</span></svelte:fragment>
				</AccordionItem>
			{/if}
		</Accordion>
	</div>
</div>
