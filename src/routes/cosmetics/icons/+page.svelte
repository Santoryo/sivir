<script>
  export let data;
  console.log(data.icons.length);
  import { useLazyImage as lazyImage } from 'svelte-lazy-image';
  import { fade } from 'svelte/transition';
  let value = false;
</script>


<div class="p-10">
<div class="text-4xl font-bold uppercase w-fit mb-4"><div class="flex flex-row">Icons</div>
<div class="text-2xl font-semibold uppercase">
    Showing {100 * data.page} to {100 * data.page + 100} of {data.length} icons
</div>
</div>

<div class="btn-group variant-filled">
  <a href="/cosmetics/icons?page={data.page - 1}" class="btn" data-sveltekit-preload-data="hover">BACK</a>
  <a href="/cosmetics/icons?page={data.page + 1}" class="btn" data-sveltekit-preload-data="hover">NEXT</a>
</div>

<div class="flex flex-row w-full h-fit gap-4 flex-wrap">
{#each data.icons as icon}
  {#if icon.hasOwnProperty("imagePath")}
  <div class='frame bg-center'>
    <img src="https://cdn.brelshaza.com/assets/profile-icons/{icon.id}.jpg" alt={icon.name} class="w-3/5 h-3/5 self-center" />
    <span class="absolute bottom-0 skincardinfo text-center">{icon.title}
</div>
  {/if}
{/each}

</div>
</div>