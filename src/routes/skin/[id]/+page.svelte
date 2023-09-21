<script lang='ts'>
    // @ts-nocheck

        import SkinCard from '$lib/SkinCard/SkinCard.svelte';
        import moment from 'moment';
        import Meta from '$lib/Meta.svelte';
        import Skin from '$lib/SkinCard/Skin.svelte';
        import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
        import Fa from 'svelte-fa/src/fa.svelte'
        import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons'
        import { Toast, getToastStore } from '@skeletonlabs/skeleton';
        import {pb, currentUser, getWishlist} from '$lib/pocketbase.js'
        import { onDestroy, onMount } from 'svelte';
    import { invalidateAll } from '$app/navigation';

        const toastStore = getToastStore();
    
        export let data;

        let likeStatus = false;
    
        const info = data.skin.version;

        let _skin = "";


        onMount(async () => {
            try {
                await assignSkinVariable()
                _skin ? likeStatus = true : likeStatus = false;
            }
            catch
            {
                likeStatus = false;
            }

            console.log(likeStatus)
        })

        onDestroy(() => invalidateAll());

        async function assignSkinVariable()
        {
            const wishlist = await getWishlist();
            _skin = wishlist.find(o => o.name == name(info.skin))

        }

        function name(skins) {
        if(skins.formatName == skins.name)
        {
            return skins.formatName + " " + skins.championName
        }
        else
        {
            return skins.formatName
        }
    }

        function timestamp(_id)
        {
            const ts = _id.toString().substring(0,8)
            const date = new Date( parseInt( ts, 16 ) * 1000 )
            return date
        }

        function eachString(array)
        {
            let res = "";
            array.forEach(element => {
                res += element + ", "
            });
            return res.slice(0, -2); 

        }

        async function like()
        {
            if(likeStatus == false)
            {
                console.log("adding skin")

                const data = {
                    name: name(info.skin),
                    skinData: info.skin,
                    user: $currentUser.id
                }

                await pb.collection('skins').create(data);
                likeStatus = !likeStatus;
                await assignSkinVariable();
            }

            else
            {
                await assignSkinVariable();
                await pb.collection('skins').delete(_skin.id)
                likeStatus = !likeStatus;
            }

            const t = {
            message: likeStatus ? `<b>${name(info.skin)}</b> has been added to your wishlist!` : `<b>${name(info.skin)}</b> has been removed from your wishlist!`,
            background: likeStatus ? 'variant-filled-success' : 'variant-filled-error'
            };

            toastStore.trigger(t);
            
        }

    
        const splash = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/";

    
    </script>

    <Meta titleSuffix={name(info.skin)} description={`${info.lore}`} />

    <Toast></Toast>
    
    <div class="p-10 flex flex-row gap-3 flex-wrap justify-left items-start">
    

        <div class='w-full h-full max-w-[288px] max-h-[288px] aspect-square md:h-72 md:w-72 bg-cover relative flex justify-center uppercase font-semibold skincard rounded-md border border-gray-800 hover:border-gray-600 smooth text-white;' style='background-image: url("{info.skin.tilePath}")'>
            
        </div>

        <div class="text-3xl font-bold uppercase h-full w-[800px] pt-2 flex-wrap grow-0 break-all">

            {#if info.skin.rarity != "NoRarity"}<div class="h-[30px] w-[30px] bg-cover inline-block bg-center" style='background-image: url("/lol/{info.skin.rarity}.webp")'></div>{/if}
            {name(info.skin)}

            <div>
            {#if !info.skin.isBase}

                {#if info.skin.cost == "Special"}
                        {#if info.skin.distribution.includes("Mythic Essence")}
                        <div class="big-icon" style='background-image: url("/lol/ME.webp")'></div> {info.skin.distribution.replace("Mythic Essence", "")}
                        
                        {:else}

                        {#if info.skin.rarity != "Mythic"}
                        {info.skin.distribution}
                        {/if}

                        {/if}
                {:else if info.skin.rarity != "NoRarity" && info.skin.price != "Special"}

                    <div class="big-icon" style='background-image: url("/lol/RP.webp")'></div> {info.skin.cost}

                {:else if info.skin.rarity == "NoRarity" && info.skin.price != "Special"}

                    <div class="big-icon" style='background-image: url("/lol/RP.webp")'></div> {info.skin.cost}

                {/if}

            {/if}
            </div>



            <div class="text-xl italic font-semibold uppercase flex flex-col">
                <div class="not-italic">Release date: {moment(info.skin.release).format('D MMM Y')}</div>
                {#if info.skin.chromas.length > 0}<div><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/chromas.webp")'></div> {info.skin.chromas.length} chromas</div>{/if}
                {#if info.skin.set[0]}<div><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/set.png")'></div> <span class='text-xl font-semibold'>{info.skin.set[0]}</span></div>{/if}<br>
                {#if info.skin.splashArtist.length > 0}<div><div class="h-[15px] w-[15px] bg-cover bg-center inline-block shadow-lg" style='background-image: url("/lol/artist.png")'></div> {eachString(info.skin.splashArtist)}</div>{/if}
                {#if info.skin.newEffects}<div><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/effects.png")'></div> New Effects</div>{/if}
                {#if info.skin.newAnimations}<div><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/animations.png")'></div> New Animations</div>{/if}
                {#if info.skin.newRecall}<div><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/recall.png")'></div> New Recall</div>{/if}
                {#if info.skin.newQuotes}<div><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/actor.png")'></div> New Quotes</div>{/if}


            </div>
        </div>

        <div class="text-2xl font-bold uppercase w-[350px] pt-2">
            Sale Occurrences
            <div class="w-full h-24 text-base font-semibold flex flex-col gap-1 overflow-y-auto">
                {#if info.res.length > 0}
                <div class="h-5 w-full flex flex-row p-1"><div class="w-1/2">Date</div><div class="w-1/2">Time since</div></div>
                {#each info.res as sale}
                <a href="/sale-rotation/{sale._id}"><div class="h-5 w-full flex flex-row p-1"><div class="w-1/2">{moment(timestamp(sale._id)).format('DD MMM Y')}</div><div class="w-1/2">{moment(timestamp(sale._id)).fromNow(true)}</div></div></a>
                {/each}
                {:else}
                <div class="h-5 w-full flex flex-row italic text-sm">This skin wasn't in sale / mythic shop yet.</div>
                {/if}
            </div>
            <div class="mt-3">
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class="chip variant-soft hover:variant-filled w-full px-4 py-2 text-sm" on:click={like}>
                    {#if likeStatus == false}
                    <Fa icon={faHeart} /><span>Add to Wishlist</span>
                    {:else}
                    <Fa icon={faHeartCrack} /><span>Remove from Wishlist</span>
                    {/if}
                </span>
            </div>
        </div>


        <div class="uppercase w-full font-semibold">
        <Accordion autocollapse>
            {#if info.skin.chromas.length > 0}
            <AccordionItem open>
                <svelte:fragment slot="lead"><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/chromas.webp")'></div></svelte:fragment>
                <svelte:fragment slot="summary">CHROMAS</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="w-full flex flex-row flex-wrap justify-center gap-2">
                        {#each info.skin.chromas as chroma}
                            <div class='bg-contain bg-no-repeat skincard rounded-md border border-gray-800 hover:border-gray-600 smooth text-white relative frame' style="background-image: url({chroma.chromaPath})"><span class="absolute bottom-0 skincardinfo text-center">{chroma.name}</span></div>
                        {/each}
                    </div>
                </svelte:fragment>
            </AccordionItem>
            {/if}
            <AccordionItem>
                <svelte:fragment slot="lead"><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/splash.png")'></div></svelte:fragment>
                <svelte:fragment slot="summary">SPLASH ART</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="w-full aspect-video bg-cover bg-center" style="background-image: url({info.skin.uncenteredSplashPath})"></div>
                </svelte:fragment>
            </AccordionItem>
            {#if info.skin.lore}
            <AccordionItem>
                <svelte:fragment slot="lead"><div class="h-[15px] w-[15px] bg-cover inline-block bg-center shadow-lg" style='background-image: url("/lol/lore.png")'></div></svelte:fragment>
                <svelte:fragment slot="summary">DESCRIPTION</svelte:fragment>
                <svelte:fragment slot="content"><span class="normal-case">{info.skin.lore}</span></svelte:fragment>
            </AccordionItem>
            {/if}
        </Accordion>
        </div>
    
    </div>
    