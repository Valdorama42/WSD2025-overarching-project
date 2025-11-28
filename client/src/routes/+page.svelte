<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    import HomePageList from "$lib/components/homePage/HomePageList.svelte";
    import { initHomePage } from "$lib/states/homePageState.svelte";
    
    const authState = useAuthState();

    initHomePage();
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>
  
<h1>Welcome to the home page!</h1>

{#if authState.user}
    <a href="/communities">Go to communities</a>
{/if}

<HomePageList />