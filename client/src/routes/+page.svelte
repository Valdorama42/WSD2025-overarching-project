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

<h1 class="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
    Latest Posts
</h1>

{#if authState.user}
    <a 
        href="/communities"
        class="inline-block mb-10 px-5 py-2.5 rounded-xl 
               bg-linear-to-r from-indigo-600 to-purple-600
               text-white font-medium shadow-md
               hover:from-indigo-700 hover:to-purple-700
               transition-all active:scale-[0.98]"
    >
        Go to Communities
    </a>
{/if}

<div class="mt-4">
    <HomePageList />
</div>
