<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const authState = useAuthState();
</script>

<header class="p-4 bg-gray-100 mb-6 flex justify-between items-center">
    <span class="text-xl text-primary-900">App name</span>
    <nav>
        <ul class="flex space-x-4">
            <li><a class="anchor " href="/">Home</a></li>
            <li><a class="anchor" href="/communities">Communities</a></li>
        </ul>
    </nav>
    {#if authState.user} <!-- Logged in -->
        <div class="flex items-center space-x-4">
            <span>Hello, {authState.user.email}!</span>
            <button onclick={() => authState.logout()}>Logout</button>
        </div>
    {:else}
        <span >Hello anonymous!</span>
        <nav class="flex space-x-4">
            <a class="anchor" href="/auth/login">Login</a>
            <a class="anchor" href="/auth/register">Register</a>
        </nav>
    {/if}
</header>