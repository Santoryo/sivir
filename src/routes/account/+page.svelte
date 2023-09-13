<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'
	import {currentUser, pb} from '$lib/pocketbase.js'

	export let data


	async function login()
	{
		await pb.collection('users').authWithOAuth2({provider: 'discord'})

	}

	async function logout()
	{
		await pb.authStore.clear()
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<!-- <a href=""></a><button>Login with Discord</button> -->

{#if $currentUser}
 {$currentUser.username}

 <button on:click={logout}>Log out </button>

{:else}

<button on:click={login}>Login with Discord</button>

{/if}