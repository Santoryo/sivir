<script>
    import { goto } from "$app/navigation";
  import { currentUser } from "$lib/pocketbase";

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
        <a href="/" on:click={() => drawerClose("/")}><i class='nav-icon' style='background-image: url("/home.png")'></i> home</a>
        <a href="/sale-rotation" on:click={() => drawerClose("/sale-rotation")}><i class='nav-icon' style='background-image: url("/lol/RP.webp")'></i> SALE ROTATION</a>
        <a href="/mythic-shop" on:click={() => drawerClose("/mythic-shop")}><i class='nav-icon' style='background-image: url("/lol/ME.webp")'></i> MYTHIC SHOP</a>
        <a href="/champions" on:click={() => drawerClose("/champions")}><i class='nav-icon' style='background-image: url("/champions.png")'></i> CHAMPIONS</a>
        <a href="/skinlines" on:click={() => drawerClose("/skinlines")}><i class='nav-icon' style='background-image: url("/skins.webp")'></i> SKINLINES</a>


        <div class="mt-auto"><a href="/account" on:click={() => drawerClose("/account")}>
        {#if $currentUser}
        <i class='nav-icon' style='background-image: url("/account.webp")'></i>{$currentUser?.username}
        {:else}
        <i class='nav-icon' style='background-image: url("/account.webp")'></i>SIGN IN
        {/if}
        
        </a></div>
</nav>
