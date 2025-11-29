<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    const authState = useAuthState();
</script>

<header
    class="
        top-0 z-40 w-full 
        backdrop-blur-xl bg-white/30 
        border-b border-white/20
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        relative
    "
>

    <!-- Glowing gradient bar behind the header -->
    <div
        class="
            absolute inset-x-0 top-0 h-[3px] 
            bg-linear-to-r from-purple-500 via-fuchsia-400 to-indigo-500
            animate-pulse
        "
    ></div>

    <!-- Floating glow orb -->
    <div
        class="
            pointer-events-none 
            absolute -top-10 left-1/2 -translate-x-1/2
            w-72 h-32 rounded-full blur-3xl
            bg-linear-to-r from-purple-300/40 to-blue-300/30
        "
    ></div>

    <div
        class="relative px-6 sm:px-12 py-4 flex items-center justify-between"
    >

        <!-- APP LOGO / NAME -->
        <a
            href="/"
            class="
                text-2xl font-extrabold tracking-tight
                bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 
                bg-clip-text text-transparent
                drop-shadow-sm
                hover:scale-[1.03] transition-transform duration-300
            "
        >
            AppName
        </a>

        <!-- NAVIGATION -->
        <nav class="hidden sm:block">
            <ul class="flex items-center gap-8">

                <!-- NAV ITEM COMPONENT STYLE -->
                <li class="group relative">
                    <a
                        href="/"
                        class="
                            font-medium text-gray-700
                            group-hover:text-indigo-600 transition-colors
                        "
                    >
                        Home
                    </a>

                    <!-- Animated underline -->
                    <span
                        class="
                            absolute left-0 -bottom-1 h-0.5 w-0 
                            bg-linear-to-r from-purple-500 to-indigo-500 
                            transition-all duration-300 group-hover:w-full
                        "
                    ></span>
                </li>

                <li class="group relative">
                    <a
                        href="/communities"
                        class="
                            font-medium text-gray-700
                            group-hover:text-indigo-600 transition-colors
                        "
                    >
                        Communities
                    </a>

                    <span
                        class="
                            absolute left-0 -bottom-1 h-0.5 w-0 
                            bg-linear-to-r from-indigo-500 to-purple-500 
                            transition-all duration-300 group-hover:w-full
                        "
                    ></span>
                </li>
            </ul>
        </nav>

        <!-- AUTH -->
        {#if authState.user}
            <div class="flex items-center gap-4">
                <span
                    class="
                        hidden sm:block text-gray-800 font-medium
                        drop-shadow-sm
                    "
                >
                    {authState.user.email}
                </span>

                <button
                    onclick={() => authState.logout()}
                    class="
                        px-4 py-2 rounded-xl font-semibold
                        text-white shadow-md
                        bg-linear-to-r from-indigo-600 to-purple-600
                        hover:from-indigo-500 hover:to-purple-500
                        active:scale-[0.96]
                        transition-all duration-200
                    "
                >
                    Logout
                </button>
            </div>

        {:else}

            <div class="flex items-center gap-4">

                <a
                    href="/auth/login"
                    class="
                        px-4 py-2 rounded-xl font-semibold
                        bg-white/60 text-indigo-700 border border-indigo-300
                        shadow-sm
                        hover:bg-indigo-100 hover:border-indigo-400
                        active:scale-[0.96]
                        transition-all duration-200
                    "
                >
                    Login
                </a>

                <a
                    href="/auth/register"
                    class="
                        px-4 py-2 rounded-xl font-semibold text-white
                        bg-linear-to-br from-pink-500 via-purple-600 to-indigo-600
                        shadow-lg hover:shadow-xl
                        hover:brightness-110 active:scale-[0.96]
                        transition-all duration-200
                    "
                >
                    Register
                </a>

            </div>
        {/if}

    </div>
</header>
