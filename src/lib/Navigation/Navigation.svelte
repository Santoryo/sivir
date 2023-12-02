<script>
// @ts-nocheck

    import { goto } from "$app/navigation";
    import { currentUser } from "$lib/pocketbase";
    import {page} from '$app/stores'

// @ts-nocheck

    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    /**
     * @param {string | URL} link
     */
    function drawerClose(link) {
        drawerStore.close();
        goto(link)
    }

    console.log()
    </script>


<nav class="list-nav p-4 font-semibold uppercase flex flex-col h-full" data-sveltekit-preload-data="hover">
        <a href="/" on:click={() => drawerClose("/")} class:bg-primary-active-token={$page.url.pathname == "/"}><i class='nav-icon' style='background-image: url("/home.png")'></i> home</a>
        <a href="/sale-rotation" on:click={() => drawerClose("/sale-rotation")} class:bg-primary-active-token={$page.url.pathname == "/sale-rotation"}><i class='nav-icon' style='background-image: url("/lol/RP.webp")'></i> SALE ROTATION</a>
        <a href="/mythic-shop" on:click={() => drawerClose("/mythic-shop")} class:bg-primary-active-token={$page.url.pathname == "/mythic-shop"}><i class='nav-icon' style='background-image: url("/lol/ME.webp")'></i> MYTHIC SHOP</a>
        <a href="/champions" on:click={() => drawerClose("/champions")} class:bg-primary-active-token={$page.url.pathname == "/champions"}><i class='nav-icon' style='background-image: url("/champions.png")'></i> CHAMPIONS</a>
        <a href="/skinlines" on:click={() => drawerClose("/skinlines")} class:bg-primary-active-token={$page.url.pathname == "/skinlines"}><i class='nav-icon' style='background-image: url("/skins.webp")'></i> SKINLINES</a>
        <a href="/stats" on:click={() => drawerClose("/stats")} class:bg-primary-active-token={$page.url.pathname == "/stats"}><i class='nav-icon' style='background-image: url("/lol/stats.webp")'></i> STATS</a>
        <a href="/discord" on:click={() => drawerClose("/discord")} class:bg-primary-active-token={$page.url.pathname == "/discord"}><i class='nav-icon' style='background-image: url("/bot.png")'></i> DISCORD BOT</a>
        <a href="/timeline" on:click={() => drawerClose("/timeline")} class:bg-primary-active-token={$page.url.pathname == "/timeline"}><i class='nav-icon' style='background-image: url("/calendar.png")'></i> TIMELINE</a>


        <div class="mt-auto"><a href="/account" on:click={() => drawerClose("/account")} class:bg-primary-active-token={$page.url.pathname == "/account"}>
        {#if $currentUser}
        <i class='nav-icon' style='background-image: url("/account.webp")'></i>{$currentUser?.username}
        {:else}
        <i class='nav-icon' style='background-image: url("/account.webp")'></i>SIGN IN
        {/if}
        
        </a></div>
</nav>
