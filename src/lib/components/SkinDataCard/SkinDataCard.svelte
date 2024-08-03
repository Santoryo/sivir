<script lang="ts">
	import name from "$lib/skinName";

    export let skin: SkinData;
</script>

<a href="/skin/{skin.skinId}">
    {#if !skin.isBase}
        <div class="frame" style="background-image: url('//wsrv.nl/?url={skin.tilePath}')">
            {#if skin.cost == 0}
                <span class="absolute bottom-0 skincardinfo text-center">
                    {#if skin.rarity != 'NoRarity'}<div class="small-icon" style="background-image: url('/lol/{skin.rarity}.webp')"></div>{/if}
                    {skin.skinName}
                    <br />
                    {#if skin.distribution.includes('Mythic Essence')}
                        <div class="small-icon" style="background-image: url('/lol/ME.webp')"></div>
                        {skin.distribution.replace('Mythic Essence', '')}
                    {:else}
                        {skin.distribution}
                    {/if}
                </span>
            {:else if skin.rarity != 'NoRarity' && skin.price != 'Special'}
                <span class="absolute bottom-0 skincardinfo text-center">
                    <div class="small-icon" style="background-image: url('/lol/{skin.rarity}.webp')"></div>
                    {skin.skinName}
                    <br />
                    <div class="small-icon" style="background-image: url('/lol/RP.webp')"></div>
                    {skin.cost}
                </span>
            {:else if skin.rarity == 'NoRarity' && skin.price != 'Special'}
                <span class="absolute bottom-0 skincardinfo text-center">
                    {skin.skinName}
                    <br />
                    <div class="small-icon" style="background-image: url('/lol/RP.webp')"></div>
                    {skin.cost}
                </span>
            {/if}
        </div>
    {/if}
</a>