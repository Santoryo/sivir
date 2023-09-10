<script>
// @ts-nocheck


    export let skin;

    const splash = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/";

</script>

<div class='frame' style='background-image: url("{splash}{skin.championId}/{skin.championId}0{skin.number.toLocaleString('en-US', {minimumIntegerDigits: 2})}.jpg")'>
    <span class="absolute bottom-0 skincardinfo text-sm text-center">{skin.skinName}
        <br> <div class="h-[15px] w-[15px] bg-cover inline-block bg-center" style='background-image: url("./lol/RP.webp")'></div> {skin.discountedPrice} <span class='font-light'><s>{skin.originalPrice}</s></span></span>

</div>
