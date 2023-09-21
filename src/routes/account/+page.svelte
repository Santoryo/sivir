<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'
	import {currentUser, getWishlist, pb} from '$lib/pocketbase.js'
	import Icon from '$lib/Icon.svelte'
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import moment from 'moment';

	import { Avatar } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
	export let data

	const toastStore = getToastStore()

	let resultList;

	let skins: any = [];

	onMount(async () => {
		skins = await getWishlist();
	})


	async function login()
	{
		await pb.collection('users').authWithOAuth2({provider: 'discord'})

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


</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<!-- <a href=""></a><button>Login with Discord</button> -->

{#if $currentUser}
<div class="p-10 flex flex-col gap-3 flex-wrap justify-left items-left text-left">

	<Toast />

	<div class="text-4xl font-bold uppercase w-fit">Welcome back, {$currentUser.username}
		<div class="text-2xl font-semibold uppercase">
			You have {skins.length}/15 skins on your wishlist
		</div>
	</div>

	<section class="w-full text-token card p-4 space-y-4">
		<p class="font-bold">YOUR WISHLIST</p>
		<ul class="list">
				{#each skins as skin}
				<li class="py-0.5">
					<a href="/skin/{skin.skinData.id}"><Avatar src={skin.skinData.tilePath} width="w-16" rounded="rounded-2xl" /></a>
					<span class="flex-auto"><a href="/skin/{skin.skinData.id}">{skin.name}</a> <br /><span class="opacity-50 text-sm">Added on {moment(skin.updated).format('DD MMM YYYY')}</span></span>
					<span class="cursor-pointer select-none font-extrabold" on:click={() => {removeFromList(skin)}}>X</span>
				</li>
					
				{/each}
		</ul>
	</section>

	<button on:click={logout} type="button" class="btn variant-filled-primary w-28">Sign Out</button>
</div>

{:else}

<div class="p-10 flex flex-col gap-3 flex-wrap justify-center items-center text-center">
	<div class="text-2xl font-semibold">Login with your Discord account to keep track of your wishlist and edit it any time via the site</div>
	<div><button on:click={login} type="button" class="btn bg-[#5865F2]"><Icon icon={"discord"} /><span>Login with Discord</span></button></div>
</div>


{/if}