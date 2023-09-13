<div class="h-screen flex items-center justify-center">

<div class="w-[300px] h-fit text-center horizontal-middle">
<div class="w-[300px] h-[300px] bg-cover bg-center" style="background-image: url('/loader.gif')"></div>
<span class="text-3xl uppercase font-bold loading select-none">LOADING</span>
</div>

</div>

<style>
    .loading:after {
    content: '.';
    animation: dots 1s steps(5, end) infinite;}

    @keyframes dots {
    0%, 20% {
        color: rgba(0,0,0,0);
        text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    40% {
        color: white;
        text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    60% {
        text-shadow:
        .25em 0 0 white,
        .5em 0 0 rgba(0,0,0,0);}
    80%, 100% {
        text-shadow:
        .25em 0 0 white,
        .5em 0 0 white;}}
</style>