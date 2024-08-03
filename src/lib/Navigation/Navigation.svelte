<script lang="ts">

    import { goto } from "$app/navigation";
    import { currentUser, pb } from "$lib/pocketbase";
    import {page} from '$app/stores'

// @ts-nocheck

    import { getDrawerStore } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import moment from "moment";
	import NavigationElement from "./NavigationElement.svelte";

    const drawerStore = getDrawerStore();

    /**
     * @param {string | URL} link
     */
    function drawerClose(link) {
        drawerStore.close();
        goto(link)
    }

    let currEvent: LoLEvent;

    onMount(async () => {
        const temp = await fetch('/api/event/');
        currEvent = await temp.json();
    });

    </script>


<nav class="list-nav p-4 font-semibold uppercase flex flex-col h-full gap-1" data-sveltekit-preload-data="hover">
    <NavigationElement title="Home" href="/" iconPath="/home.png" />
    <NavigationElement title="STATS" href="/stats" iconPath="/lol/stats.webp" />
    <NavigationElement title="DISCORD BOT" href="/discord" iconPath="/bot.png" />
    <div class="uppercase text-sm opacity-50 font-bold pl-4 py-2">League of Legends</div>
    <NavigationElement title="SALE ROTATION" href="/sale-rotation" iconPath="/lol/RP.webp" />
    <NavigationElement title="MYTHIC SHOP" href="/mythic-shop" iconPath="/lol/ME.webp" />
    <NavigationElement title="CHAMPIONS" href="/champions" iconPath="/champions.png" />
    <NavigationElement title="SKINLINES" href="/skinlines" iconPath="/skins.webp" />
    {#if currEvent && moment(currEvent.eventEndDate).diff(moment()) > 0}
        <NavigationElement title={currEvent.eventName} href="/event-shop" iconPath={`//wsrv.nl/?url=${pb.files.getUrl(currEvent, currEvent.eventIcon)}`} />
    {/if}
    <div class="uppercase text-sm opacity-50 font-bold pl-4 py-2">Teamfight Tactics</div>
    <NavigationElement title="Battle Pass" href="/tft/battlepass" iconPath="" />
    <NavigationElement title="Treasure Realms" href="/tft/treasure-realms" iconPath="" />
    <div class="mt-auto">
        <NavigationElement title={$currentUser ? $currentUser.username : "SIGN IN"} href="/account" iconPath="/account.webp" />
    </div>
</nav>
