<script>
// @ts-nocheck


    export let skin;

    const splash = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/";

    const cdn = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/loot/"

    const emotecdn = "https://raw.communitydragon.org/latest/game/"

</script>

{#if skin.type == "SKIN"}
<div class='frame' style='background-image: url("{splash}{skin.championId}/{skin.championId}0{skin.number.toLocaleString('en-US', {minimumIntegerDigits: 2})}.jpg")'>
    <span class="absolute bottom-0 skincardinfo text-sm text-center">{skin.skinName}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("./lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>

{:else if skin.outputs[0].lootId.includes("EMOTE_")}
<div class='frame' style='background-image: url("{emotecdn}{skin.imagePath.toLowerCase()}")'>
<div class='frame border-none -z-10' style='background-image: url("{emotecdn}{skin.imagePath.replace("vfx", "glow")}")'></div>

    <span class="absolute bottom-0 skincardinfo text-sm text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("./lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>

{:else if skin.type == "ITEM"}
<div class='frame' style='background-image: url("{cdn}{skin.imagePath.toLowerCase()}")'>
    <span class="absolute bottom-0 skincardinfo text-sm text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("./lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>


{/if}