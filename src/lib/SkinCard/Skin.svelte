<script>
// @ts-nocheck


    export let skin;

    const splash = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/";
    const cdn = "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/loot/";
    const emotecdn = "https://raw.communitydragon.org/latest/game/";

    console.log(skin);

</script>

{#if skin.type == "SKIN"}
<div class='frame' style='background-image: url("//wsrv.nl/?url=raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/{skin.champion.replace("'", "").replace(" ", "").toLowerCase()}/skins/skin{skin.number.toLocaleString('en-US', {minimumIntegerDigits: 2})}/images/{skin.champion.replace("'", "").replace(" ", "").toLowerCase()}_splash_tile_{skin.number}.jpg")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.skinName}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>

{:else if skin.outputs[0].lootId.includes("EMOTE_")}
<div class='frame' style='background-image: url("{emotecdn}{skin.imagePath.replace("vfx", "glow")}")'>
    <div class='frame-under border-none' style='background-image: url("//wsrv.nl/?url={emotecdn}{skin.imagePath.toLowerCase()}")'></div>

    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>

{:else if skin.type == "ITEM"}
{#if skin.name.toLowerCase().includes("+ icon")}
<div class='frame' style='background-image: url("{cdn}{skin.imagePath.toLowerCase()}")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>
{:else if skin.name.toLowerCase().includes(" icon")}
<div class='frame' style='background-image: url("//wsrv.nl/?url=https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/{skin.outputs[0].lootId.replace('SUMMONER_ICON_', '')}.png'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>
{:else if skin.outputs[0].lootId.includes("WARD_SKIN_")}
<div class='frame bg-center' style='background-image: url("//wsrv.nl/?url=https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/wardskinimages/{skin.outputs[0].lootId.replace('WARD_SKIN_', 'wardhero_')}.png")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>
{:else}
<div class='frame' style='background-image: url("{cdn}{skin.imagePath.toLowerCase()}")'>
    <span class="absolute bottom-0 skincardinfo text-center">{skin.name}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("/lol/ME.webp")'></div> {skin.price} <span class='font-light'></span></span>

</div>
{/if}


{/if}