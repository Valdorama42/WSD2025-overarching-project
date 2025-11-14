<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    
    let { children } = $props();

    const authState = useAuthState();
</script>

<header>
    <a href="/">Home</a>
    
    {#if authState.user}
        <div>
            <span>Hello, {authState.user.email}!</span>
            <button onclick={() => authState.logout()}>Logout</button>
        </div>
    {:else}
        <ul>
            <li><a href="/auth/login">Login</a></li>
            <li><a href="/auth/register">Register</a></li>
        </ul>
    {/if}
</header>

{@render children()}