<script lang="ts">
	import {currentUser, getWishlist, pb} from '$lib/pocketbase.js'
	import Icon from '$lib/Icon.svelte'
	import { Modal, Toast, getToastStore } from '@skeletonlabs/skeleton';
	import moment from 'moment';
	import { Avatar } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { faHeadSideVirus } from '@fortawesome/free-solid-svg-icons';
	import { getModalStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	const modalStore = getModalStore();
	let resultList;

	let skins: any = [];

	const toastStore = getToastStore();


	onMount(async () => {
		skins = await getWishlist();
		pb.collection('users').authRefresh();
	})


	async function login()
	{
		await pb.collection('users').authWithOAuth2({provider: 'discord'})
		//skins = await getWishlist();

	}

	async function logout()
	{
		await pb.authStore.clear()
	}

	async function removeFromList(skinInfo: any)
    {
		await pb.collection('skins').delete(skinInfo.id)

        const t = {
        message: skinInfo.name + " has been removed from your wishlist.",
        background:'variant-filled-success'
        };
        toastStore.trigger(t);
        skins = await getWishlist();
    }

	async function buttonCodeActivationHandler()
	{
		const modal: any = {
			type: 'prompt',
			// Data
			title: 'Enter the Activation Code',
			body: 'Provide the Activation Code that you got in the e-mail',
			// Populates the input value and attributes
			value: '',
			valueAttr: { type: 'text', minlength: 36, maxlength: 36, required: true },
			// Returns the updated response value
			response: (r: string) => goto(`/order/redeem-code?userId=${$currentUser?.id}&activationCode=${r}`),
		};

		modalStore.trigger(modal);

	}

	if($page.url.searchParams.has("message"))
	{
		const modal: any = {
			type: 'alert',
			title: 'Alert',
			body: $page.url.searchParams.get("message"),
			};
		modalStore.trigger(modal);
		goto('/account', { replaceState: true });
		
	}


</script>

<svelte:head>
	<title>Sivir.GG | User Management</title>
</svelte:head>

<Toast />
<Modal />

{#if $currentUser}
<div class="p-10 flex flex-col gap-3 flex-wrap justify-left items-left text-left">

	<div class="text-4xl font-bold uppercase w-fit">Welcome back, {$currentUser.username}
		<div class="text-2xl font-semibold uppercase">
			You have {skins.length}/50 skins on your wishlist
		</div>
	</div>

	<section class="w-full text-token card p-4 space-y-4">
		<p class="font-bold">YOUR WISHLIST</p>
		<ul class="list">
				{#each skins as skin}
				<li class="py-0.5">
					<a href="/skin/{skin.skinData.id}"><Avatar src={skin.skinData.tilePath.replace("http://", "https://")} width="w-16" rounded="rounded-2xl" /></a>
					<span class="flex-auto"><a href="/skin/{skin.skinData.id}">{skin.name}</a> <br /><span class="opacity-50 text-sm">Added on {moment(skin.updated).format('DD MMM YYYY')}</span></span>
					<span class="cursor-pointer select-none font-extrabold" on:click={() => {removeFromList(skin)}}>X</span>
				</li>
					
				{/each}
		</ul>
	</section>

	<div class="flex flex-row gap-2 flex-shrink-0 flex-wrap">
		<button on:click={logout} type="button" class="btn variant-filled-primary w-28">Sign Out</button>
		<a href="https://ko-fi.com/santoryo" target="_blank"><button type="button" class="btn variant-filled-secondary w-fit"><Icon icon={"kofi"} size={"30"} /> <span>Support project on Ko-Fi</span></button></a>
	
	</div>


</div>

{:else}

<div class="p-10 flex flex-col gap-3 flex-wrap justify-center items-center text-center">
	<div class="text-2xl font-semibold">Login with your Discord account to keep track of your wishlist and edit it any time via the site</div>
	<button on:click={login} on:touchstart={login} class="btn bg-[#5865F2] z-10"><Icon icon={"discord"} /><span>Login with Discord</span></button>
	<div>By logging in you agree to us storing data associated with your account as set out in our <a href="/policies/privacy-policy">privacy policy.</a></div>
	
</div>


{/if}