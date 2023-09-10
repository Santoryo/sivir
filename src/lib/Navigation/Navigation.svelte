<script>
// @ts-nocheck

    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    function drawerClose() {
        drawerStore.close();
    }
    </script>


<nav class="list-nav p-4 font-semibold" data-sveltekit-preload-data="hover">
	<ul>
        <li><a href="/" on:click={drawerClose}><i class='nav-icon' style='background-image: url("/home.png")'></i> HOME</a></li>
        <li><a href="/sale-rotation" on:click={drawerClose}><i class='nav-icon' style='background-image: url("/lol/RP.webp")'></i> SALE ROTATION</a></li>
        <li><a href="/mythic-shop" on:click={drawerClose}><i class='nav-icon' style='background-image: url("/lol/ME.webp")'></i> MYTHIC SHOP</a></li>

	</ul>
</nav>
