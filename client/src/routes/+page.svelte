<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const authState = useAuthState();
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>
  
<h1>Welcome to the home page!</h1>

{#if authState.user}
    <a href="/communities">Go to communities</a>
{/if}