<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	initializeStores();

	const drawerStore = getDrawerStore();

	function drawerOpen() {
	drawerStore.open({});
	}



</script>

<!-- App Shell -->
<Drawer><Navigation /></Drawer>
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">SIVIR.GG</strong>
				</div>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">

			<LightSwitch />
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SivirGG"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>

			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>


	<!-- Page Route Content -->
	<slot />
</AppShell>