<script lang="ts">
    export let champion: Champion;
</script>


<div class="frame" style="background-image: url('//wsrv.nl/?url={champion.tilePath}');">
    <span class="skincardinfo absolute bottom-0 text-center">
        {champion.name}
        <br />
        <div class="inline-block h-[15px] w-[15px] bg-cover bg-center shadow-lg" style="background-image: url('/lol/BE.png')"></div>
        <span class="pr-2">{champion.price.blueEssence}</span>
        <div class="inline-block h-[15px] w-[15px] bg-cover bg-center shadow-lg" style="background-image: url('/lol/RP.webp')"></div>
        {champion.price.rp}
    </span>
</div>