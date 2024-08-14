<script lang="ts">
	import name from "$lib/skinName";

    export let skin: SkinData;
    export let sale: boolean = false;
    export let saleInfo: SaleRotationItem;
</script>

<a href="/skin/{skin.skinName.replaceAll(" ", "-")}">
    {#if !skin.isBase && sale == false}
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
    {#if sale}
    <div class="frame" style="background-image: url('//wsrv.nl/?url={skin.tilePath}')">
        <div class="absolute top-2 right-2 bg-red-500 px-3 rounded-full font-bold">-{saleInfo.percentage}%</div>
        <span class="absolute bottom-0 skincardinfo text-center">
            <div class="small-icon" style="background-image: url('/lol/{skin.rarity}.webp')"></div>
            {skin.skinName}
            <br />
            <div class="small-icon" style="background-image: url('/lol/RP.webp')"></div>
            <s class="opacity-80">{skin.cost}</s> {saleInfo.price}
        </span>
    </div>
    {/if}


</a>