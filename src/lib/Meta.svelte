<script lang="ts">
	import { page } from '$app/stores';
	export let title: string = 'Sivir.GG';
	export let description: string;
	export let image = '/favicon.jpg';
	export let path = $page.url.pathname;
	export let domain = 'https://sivir.gg/';
	export let titleSuffix = '';
	export let keywords = '';
	const titleWithSuffix = (titleSuffix === title) ? title : `${titleSuffix} | ${title}`;
	const fullURI = `${domain}${path}`;
</script>

<svelte:head>
	<!-- Search engines -->
	<title>{titleWithSuffix}</title>
	<meta name="title" content={titleWithSuffix} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#FF3D3D">
	<meta name="keywords" content={keywords}>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={fullURI} />
	<meta property="og:title" content={titleWithSuffix} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:url" content={fullURI} />
	<meta property="twitter:title" content={titleWithSuffix} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>