<script>
    import { goto } from '$app/navigation';


    export let data;

    goto(encodeURI('/account?message=' + data.data))

</script>
