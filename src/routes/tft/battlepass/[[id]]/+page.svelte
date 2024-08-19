<script lang="ts">
	import Meta from '$lib/Meta.svelte';
	import moment from 'moment';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { dragscroll } from '@svelte-put/dragscroll';
    import realmcrystals from '$lib/assets/realmcrystals.png';
    import starshards from '$lib/assets/starshards.png';
    import treasuretokens from '$lib/assets/treasuretokens.png';

    export let data;
    const battlepass: TFTBattlepass = data.battlepass;

    let value: number = 0;


    function countRewards(data) {
    let totalRealmCrystals = 0;
    let totalStarShards = 0;
    let totalTreasureTokens = 0;

    data.forEach(item => {
        const title = item.title.toLowerCase();
        if (title.includes('realm crystals')) {
        const match = title.match(/(\d+) realm crystals/);
        if (match) {
            totalRealmCrystals += parseInt(match[1], 10);
        }
        } else if (title.includes('star shards')) {
        const match = title.match(/(\d+) star shards/);
        if (match) {
            totalStarShards += parseInt(match[1], 10);
        }
        } else if (title.includes('treasure tokens')) {
        const match = title.match(/(\d+) treasure tokens/);
        if (match) {
            totalTreasureTokens += parseInt(match[1], 10);
        }
        }
    });

    return {
        totalRealmCrystals,
        totalStarShards,
        totalTreasureTokens
    };
    }

    const { totalRealmCrystals, totalStarShards, totalTreasureTokens } = countRewards(battlepass.rewards);


    function lol2cdragon(string)
    {
        return string.toLowerCase().replace("/lol-game-data/assets/", `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/`);
    }
</script>

<Meta titleSuffix="Battle Pass" description="A look at all the things TFT players can earn from the {battlepass.premiumName} Battle Pass including new arenas, Little Legends and more" />

<svelte:head>
    <meta property="article:published_time" content={battlepass.startDate} />
</svelte:head>


<div class="w-full h-full absolute bg-cover opacity-5" style="background-image: url('{battlepass.backgrounds['background--battlepass-completion']}')"></div>

<div class="p-10 flex flex-col items-left lg:items-left">

    <div class="flex flex-col w-full relative gap-2">
        <div class="w-full min-h-[200px] relative flex flex-row justify-between gap-4 flex-wrap items-center">
            <div class="w-[400px] h-full">
                <h1 class="text-4xl font-bold uppercase w-fit">
                    {battlepass.name}
                </h1>
                <h2 class="text-2xl font-semibold uppercase">
                    Ends on {moment(battlepass.endDate).format('MMMM Do')}
                </h2>
                <div class="text-2xl font-semibold uppercase">
                   ({moment(battlepass.endDate).fromNow()})
                </div>
            </div>
            <img src="//wsrv.nl/?url={lol2cdragon(battlepass.rewards[value].iconImageUrl)}" class="w-72 h-72 rounded-md" alt="{battlepass.name}" />
            <div class="w-[400px] h-full">
                <div class="text-4xl font-bold uppercase w-fit">
                    {battlepass.rewards[value].title}
                </div>
                <div class="text-2xl font-semibold uppercase">
                    {battlepass.rewards[value].description}
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row overflow-x-auto gap-2 scroll-smooth bg-surface-500/30 rounded-lg p-3" use:dragscroll>
            {#each battlepass.rewards as reward, i}
            <button class="flex flex-col gap-2" on:click={() => value = i}>
                <div class="flex relative flex-col gap-2 w-24 h-24 lg:w-36 lg:h-36 flex-shrink-0 bg-cover border-gray-700/80 hover:border-gray-700 smooth border-2 rounded-lg" style="background-image: url('//wsrv.nl/?url={reward.iconImageUrl.toLowerCase().replace("/lol-game-data/assets/", `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/`)}')">
                    <div class="absolute bottom-1 left-0 right-0 z-10 flex flex-col skincardinfo">
                        <div class="font-bold">{reward.isPaid ? "" : "FREE"}</div>
                    </div>
                </div>
                <div class="w-full h-fit">{reward.level}</div>
            </button>
            {/each}
        </div>

        <div class="text-2xl font-bold uppercase mt-2">
            In Total:
            <div class="text-xl font-semibold flex-col">
                <div>{battlepass.rewards.length} Rewards</div>
                <div class="flex flex-row gap-1">{totalRealmCrystals} <img src={realmcrystals} class="w-6" alt="Realm Crystals" /></div>
                <div class="flex flex-row gap-1">{totalStarShards} <img src={starshards} class="w-6" alt="Star Shards" /></div>
                <div class="flex flex-row gap-1">{totalTreasureTokens} <img src={treasuretokens} class="w-6" alt="Treasure Tokens" /></div>
            </div>
        </div>
    </div>

</div>