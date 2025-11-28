<script>
    import "../app.css";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    
    let { children } = $props();

    const authState = useAuthState();


</script>

<header>
    <a href="/">Home</a>
    <a href="/communities">Communities</a>
    <br/>

    {#if authState.user} <!-- Logged in -->
        <div>
            <span>Hello, {authState.user.email}!</span>
            <button onclick={() => authState.logout()}>Logout</button>
        </div>
    {:else}
        <span>Hello anonymous!</span>
        <nav>
            <a href="/auth/login">Login</a>
            <a href="/auth/register">Register</a>
        </nav>
    {/if}
</header>

{@render children()}