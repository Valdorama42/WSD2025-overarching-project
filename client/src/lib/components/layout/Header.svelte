<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const authState = useAuthState();
</script>

<header class="w-full bg-white border-b shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-6">

        <!-- LEFT: Logo -->
        <div class="flex items-center">
            <span class="text-2xl font-bold text-gray-900 tracking-tight">
                App name
            </span>
        </div>

        <!-- CENTER: Navigation -->
        <nav class="flex-1 flex justify-center">
            <ul class="flex items-center space-x-8">
                <li>
                    <a 
                        href="/"
                        class="relative text-gray-700 hover:text-blue-600 font-medium 
                               transition-colors"
                    >
                        Home
                        <span class="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 rounded 
                                     transition-all duration-200 group-hover:w-full"></span>
                    </a>
                </li>
                <li>
                    <a 
                        href="/communities"
                        class="relative text-gray-700 hover:text-blue-600 font-medium 
                               transition-colors"
                    >
                        Communities
                    </a>
                </li>
            </ul>
        </nav>

        <!-- RIGHT: Auth -->
        {#if authState.user}
            <div class="flex items-center space-x-4">
                <span class="text-gray-600 hidden md:inline">
                    Hello, {authState.user.email}!
                </span>

                <button 
                    onclick={() => authState.logout()}
                    class="px-4 py-1.5 bg-red-400 hover:bg-red-600 
                           text-white rounded-md text-sm font-medium
                           shadow-sm transition focus:outline-none 
                           focus:ring-2 focus:ring-red-400"
                >
                    Logout
                </button>
            </div>
        {:else}
            <div class="flex items-center space-x-4">
                <span class="text-gray-600">Hello anonymous!</span>
                <nav class="flex space-x-4">
                    <a 
                        href="/auth/login" 
                        class="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </a>
                    <a 
                        href="/auth/register" 
                        class="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </a>
                </nav>
            </div>
        {/if}

    </div>
</header>
