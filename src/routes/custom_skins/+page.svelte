<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import moment from 'moment';
const skins = [
    {
        "name": "Lucy Kushinada Kai'Sa",
        "image": "https://i.pinimg.com/736x/f3/ef/73/f3ef73243eb6a57c179bf9a824112284.jpg",
        "video": "https://www.youtube.com/embed/QKsh4RqET3g?si=BM4PXqEhPSnLN2xo",
        "download": "https://raw.githubusercontent.com/Santoryo/leagueskins/main/Lucy Kai'Sa V1.0.0.fantome",
        "description": "Changes Kai'Sa to Lucy Kushinada from the anime Cyberpunk Edgerunners<br> - New VFX <br> - New Model",
        "date": "8.15.2024"
    },
    {
        "name": "Clorinde Samira",
        "image": "https://i.pinimg.com/originals/4e/6a/9a/4e6a9a24a23e104e726b9bc3bd88cdcc.jpg",
        "video": "https://www.youtube.com/embed/PT5DUUduOSk",
        "download": "https://raw.githubusercontent.com/Santoryo/leagueskins/main/Clorinde Samira V1.2.0 by lucy.fantome",
        "description": "Changes Samira to Clorinde from Genshin Impact<br> - New VFX <br> - New Model <br> - New Voicelines",
        "date": "07.07.2024"
    },
    {
        "name": "Kuki Shinobu Akali",
        "image": "https://i.pinimg.com/564x/bb/7a/8b/bb7a8bb67d5430f245c098e6aeab350d.jpg",
        "video": "https://www.youtube.com/embed/WMF2i6-CplQ",
        "download": "https://raw.githubusercontent.com/Santoryo/leagueskins/main/KukiShinobuAkali.fantome",
        "description": "Changes Akali to Kuki Shinobu from Genshin Impact<br> - New Voicelines <br> - New Model",
        "date": "07.11.2024"
    },
    {
        "name": "Ganyu Ashe",
        "image": "https://pbs.twimg.com/media/ErX55VwVkAAe9_8.jpg",
        "video": "https://www.youtube.com/embed/r-CUGEWvK3o",
        "download": "https://raw.githubusercontent.com/Santoryo/leagueskins/main/AsheGanyu.fantome",
        "description": "Changes Ashe to Ganyu from Genshin Impact<br> - New Model",
        "date": "07.08.2024"
    },
    
]

const modalStore = getModalStore();


</script>

<div class="p-10">
    <div class="text-4xl font-bold uppercase">CUSTOM SKINS</div>
	<div class="text-2xl font-semibold uppercase">
		You can download my League customs skins here!
	</div>

    <div class="w-full flex flex-row h-fit justify-center gap-4 mt-10">
        {#each skins.sort((a, b) => moment(b.date).diff(moment(a.date))) as skin}
        <!-- <div class="frame" style="background-image: url('//wsrv.nl/?url={skin.image}');">
            <span class="skincardinfo absolute bottom-0 text-center">
                {skin.name}
                <br />
            </span>
        </div> -->
        <div class="flex flex-row gap-2 lg:gap-3 flex-wrap justify-center">
			<div class="card w-full md:w-[350px] mx-2 h-[490px] card-hover rounded-md overflow-hidden relative cursor-pointer">
				<header>
					<!-- <img src="" class="bg-black/50 w-full aspect-[16/9]" alt="Post" /> -->
                    <iframe class="w-full aspect-[16/9]" src="{skin.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
				</header>
				<div class="p-4 space-y-2">
					<h6 class="h6 opacity-70" data-toc-ignore>{moment(skin.date).format("DD MMM Y")}</h6>
					<h3 class="h3 font-semibold" data-toc-ignore>{skin.name}</h3>
					<article>
						<p>
							{@html skin.description}
						</p>
					</article>
				</div>
				<footer class="p-4 flex justify-start items-center absolute bottom-0 w-full border-t-[1px] border-white/10">
					<div class="flex-auto flex justify-between items-center">
						<a href="{skin.download}" target="_blank" class="btn variant-filled-primary">Download</a>
					</div>
				</footer>
			</div>
		</div>
        {/each}
    </div>

</div>
