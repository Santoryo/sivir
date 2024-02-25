<script>
// @ts-nocheck


    export let skin;
    export let type = "skin";

    import name from '$lib/skinName'

    const splash = "https://cdn.brelshaza.com/assets/champion-tiles/";

</script>


{#if type == "skin"}
<div class='frame' style='background-image: url("{splash}{skin.championId}/{skin.championId}0{skin.number.toLocaleString('en-US', {minimumIntegerDigits: 2})}.jpg")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.skinName}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/RP.webp")'></div> {skin.discountedPrice} <span class='font-light'><s>{skin.originalPrice}</s></span></span>

</div>

{:else if type == "champion"}
<div class='frame' style='background-image: url("{splash}{skin.championId}/{skin.championId}000.jpg")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}
        <br>
        <div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/BE.png")'></div> <span class="pr-2">{skin.price.blueEssence}</span>  
        <div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/RP.webp")'></div> {skin.price.rp}</span>

</div>

{:else if type == "skinline"}
<div class='frame' style='background-image: url("{splash}{skin.splash}")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}</span>

</div>

{:else if type == "skinlineone"}
<div class='frame' style='background-image: url("{splash}{skin.tilePath.replace("/lol-game-data/assets/v1/champion-tiles/", "").replace("http://", "https://")}")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}</span>

</div>

{:else if type == "homepage"}
<div class='frame' style='background-image: url("{skin.tilePath.replace("/lol-game-data/assets/v1/champion-tiles/", "").replace("http://", "https://")}")'>
    <span class="absolute bottom-0 skincardinfo text-center">{name(skin)}</span>

</div>

{/if}
