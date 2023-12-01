<script lang="ts">
    import moment from 'moment'
    import { onMount } from 'svelte';
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

    const events: any = {
        "22-11-2023": [
            {
                name: "Mythic Shop Rotation",
                durationInHours: 336,
                color: "purple",
                startHour: 1
            },
            {
                name: "XD",
                durationInHours: 150,
                color: "red",
                startHour: 11
            },
            {
                name: "XD",
                durationInHours: 150,
                color: "red",
                startHour: 11
            }
        ],
        "06-12-2023": [
            {
                name: "Mythic Shop Rotation",
                durationInHours: 336,
                color: "purple",
                startHour: 1
            },
        ]
        }

        // function checkForOverlap(event: any)
        // {
        //     let aaa = 0;

        //     for(const x of (Object.entries(events)))
        //     {
        //         for(let d of x[1]) {
        //             const endDate = moment(x[0], "DD-MM-YYYY").add(d.durationInHours, 'hours')
        //             const startDateofEvent = moment(first).add(event, 'days')
        //             const startDate = moment(x[0], "DD-MM-YYYY")
        //             if(endDate.valueOf() - startDateofEvent.valueOf() < 0)
        //             {
        //                 break;
        //             }
        //             if(endDate <= startDateofEvent)
        //             {
        //                 aaa++;
        //             }
        //         }
        //     }
        //     if(aaa > 0)
        //     {
        //         aaa++;
        //     }

        //     return aaa;
        // }


            



</script>


<div class="p-10 flex flex-col">

    <div class="flex flex-row justify-between flex-wrap items-center gap-4">

    <div class="text-4xl font-bold uppercase w-fit">TIMELINE
        <div class="text-2xl font-semibold uppercase">
            Here you can find all the current and upcoming events in League
        </div>
    </div>

    <div class="text-2xl font-bold uppercase h-4"></div>
    <div class="snap-x scroll-smooth w-full h-[700px] calendar flex flex-row overflow-x-auto overflow-y-hidden relative" id="container">

        {#each Array(days) as _, i}
        <div class='w-24 snap-mandatory flex-shrink-0 border-l-2 border-slate-800 hover:border-slate-600 smooth flex flex-col' id="{i.toString()}">
        {#if parseInt(moment(first).add(i, 'days').format('D')) != 1 && i != 0}
        <div class='w-2 h-1'></div>{moment(first).add(i, 'days').format('D')}
        {:else}
        <div class='w-2 h-1'></div><span class='pl-2'>{moment(first).add(i, 'days').format('D MMM')}</span>

        {/if}
        {#if moment(first).add(i, 'days').format('dddd') == "Monday"}
            <div class='ml-[76px] w-[652px]  h-10 bg-green-500 rounded-lg z-10 mt-12 p-2 text-black cursor-pointer relative flex flex-row'><div class="font-semibold sticky left-0 self-end">Weekly Sale Rotation {moment(first).add(i, 'days').format("Do MMM")} - {moment(first).add(i+7, 'days').format("Do MMM")}</div></div>
        {/if}

        {#if events[moment(first).add(i, 'days').format('DD-MM-YYYY')]}
        {#each events[moment(first).add(i, 'days').format('DD-MM-YYYY')] as event, c}
        <div class='h-10 bg-red-500 rounded-lg z-10 p-2 text-black cursor-pointer absolute relative flex flex-row' style="width: {event.durationInHours*4}px; margin-left: {event.startHour*4}px; top: {80 + ((c+1)*80)}px;"><div class="font-semibold sticky left-0 self-end">{event.name}</div></div>
        {/each}
        {/if}

        </div>
        {/each}


    </div>
</div></div>

<style>
    .calendar {
        overflow-x: scroll;
    }
</style>
