<script>
	import '../app.postcss';
	import { AppShell, AppBar, Modal } from '@skeletonlabs/skeleton';
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
<Modal />
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
					<a href="/"><strong class="text-xl uppercase">SIVIR.GG</strong></a>
				</div>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/P4KNGxeeFa"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SivirGG"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<slot />


	<svelte:fragment slot="pageFooter">

	<div class="flex flex-col gap-2 text-center justify-center items-center">
		<div class="opacity-50 w-full flex flex-row gap-4 justify-center align-middle text-sm">
			<a href="/policies/privacy-policy">Privacy Policy</a>
			<a href="/policies/terms-of-use">Terms of Use</a>
			<a href="https://www.digitalocean.com/?refcode=ac144b6ea0f5&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge" target="_blank">Powered by DigitalOcean</a>
		</div>
		<div class="opacity-50 w-full">
			<p class="text-xs leading-[0.85rem] mb-3">© 2023 Sivir.GG. Sivir.GG isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>

		</div>

	</div>
	</svelte:fragment>
	
</AppShell>