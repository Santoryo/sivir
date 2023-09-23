<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	initializeStores();

	export let data;

	
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

	<slot />


	<svelte:fragment slot="pageFooter">

	<div class="flex flex-col gap-0 text-center justify-center">
		<div class="opacity-50 w-full flex flex-row gap-2 justify-center align-middle text-sm">
			<a href="/policies/privacy-policy">Privacy Policy</a> <a href="/policies/terms-of-use">Terms of Use</a>
		</div>
		<div class="p-3 opacity-50 w-full">
			<p class="text-xs leading-[0.85rem] w-">© 2023 Sivir.GG. Sivir.GG isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>

		</div>

	</div>
	</svelte:fragment>
	
</AppShell>