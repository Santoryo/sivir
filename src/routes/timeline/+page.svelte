<script lang="ts">
    import moment from 'moment'
    import { onMount } from 'svelte';
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();
    const days: number = 46;

    const first = moment().subtract(15, 'days');

    let a = false;

    onMount(() => {
        const scrollContainer: any = document.querySelector("#container");

        scrollContainer.addEventListener("wheel", (evt: { preventDefault: () => void; deltaY: any; }) => {
            evt.preventDefault();
            scrollContainer.scrollLeft += evt.deltaY;
        });

        const day: any = document.getElementById("15")

        day.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    })

    export let data;

    const events = data.mythics;

    function triggerModal(event: any) {
        console.log(event)
        const modal: ModalSettings = {
        type: 'alert',
        buttonTextCancel: 'Close',
        // Data
        title: event.name,
        body: `${moment(event.startDate).format("ddd, Do MMM YYYY HH:mm")} - ${moment(event.startDate).format("ddd, Do MMM YYYY HH:mm")}`,
        image: event.img,
        };
    modalStore.trigger(modal);
    }



    // const events: any = {
    //     "22-11-2023": [
    //         {
    //             name: "Mythic Shop Rotation",
    //             durationInHours: 336,
    //             color: "purple",
    //             startHour: 1,
    //             row: 1
    //         },
    //         {
    //             name: "XD",
    //             durationInHours: 150,
    //             color: "red",
    //             startHour: 11,
    //             row: 2
    //         },
    //         {
    //             name: "XD",
    //             durationInHours: 150,
    //             color: "red",
    //             startHour: 11,
    //             row: 3
    //         }
    //     ],
    //     "06-12-2023": [
    //         {
    //             name: "Mythic Shop Rotation",
    //             durationInHours: 336,
    //             color: "purple",
    //             startHour: 1,
    //             row: 1
    //         },
    //     ]
    //     }
</script>


<div class="p-10 flex flex-col">

    <div class="flex flex-row justify-between flex-wrap items-center gap-4">

    <div class="text-4xl font-bold uppercase w-fit">TIMELINE
        <div class="text-2xl font-semibold uppercase mb-2">
            Current and Upcoming Timeline
        </div>
    </div>

    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="scroll-smooth w-full h-[700px] calendar flex flex-row overflow-x-auto overflow-y-hidden relative" id="container">

        {#each Array(days) as _, i}
        <div class='w-24 flex-shrink-0 border-l-2 border-slate-800 hover:border-slate-600 hover:bg-slate-600/[0.1] smooth flex flex-col' id="{i.toString()}">
        {#if parseInt(moment(first).add(i, 'days').format('D')) != 1 && i != 0}
        <div class='w-2 h-1'></div><span class="pl-2">{moment(first).add(i, 'days').format('D')}</span>
        {:else}
        <div class='w-2 h-1'></div><span class='pl-2 dark:text-yellow-500 font-bold'>{moment(first).add(i, 'days').format('D MMM')}</span>

        {/if}
        {#if moment(first).add(i, 'days').format('dddd') == "Monday" && i < 46-7}
            <div class='ml-[76px] w-[668px]  h-10 bg-green-500 rounded-lg z-10 mt-12 p-2 text-black cursor-pointer relative flex flex-row'><div class="font-semibold sticky left-0 self-end"><b>Weekly Sale Rotation</b> {moment(first).add(i, 'days').format("Do MMM")} - {moment(first).add(i+7, 'days').format("Do MMM")}</div></div>
        {/if}

        {#if events[moment(first).add(i, 'days').format('DD-MM-YYYY')]}
        {#each events[moment(first).add(i, 'days').format('DD-MM-YYYY')] as event, c}
        <div class='h-10 rounded-lg z-10 p-2 text-black cursor-pointer absolute relative flex flex-row' on:click={() => triggerModal(event) } style="width: {event.durationInHours*4 - 5}px; margin-left: {event.startHour*4}px; top: {50 + ((event.row)*60)}px;" id="{event.color}"><div class="font-semibold sticky left-4 self-end">{@html event.name}</div></div>
        {/each}
        {/if}

        </div>
        {/each}


    </div>
</div></div>

<style>
</style>
