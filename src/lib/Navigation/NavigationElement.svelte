<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    function drawerClose(link: string) {
        drawerStore.close();
        goto(link)
    }
    export let title: string;
    export let href: string;
    export let iconPath: string;
</script>

<a href={href} on:click={() => drawerClose(href)} class:bg-primary-active-token={$page.url.pathname == href}><i class='nav-icon' style='background-image: url("{iconPath}")'></i>{title}</a>