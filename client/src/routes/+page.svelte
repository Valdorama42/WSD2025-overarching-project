<script>
    import { useAuthState } from "$lib/states/authState.svelte.js";
    import HomePageList from "$lib/components/homePage/HomePageList.svelte";
    import { initHomePage } from "$lib/states/homePageState.svelte.js";
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";
    
    const authState = useAuthState();
    const homePage = useHomePageState();

    initHomePage();
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<h1 class="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
    Welcome to the home page!
</h1>

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

{#if homePage.posts.length === 0}
    <div class="flex flex-col items-center text-center py-20 text-gray-600">

        <!-- Icon -->
        <div class="mb-6 text-indigo-600">
            <svg class="w-16 h-16 mx-auto opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 7h18M3 12h18M3 17h12" />
            </svg>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">
            No posts yet
        </h2>

        <!-- Description -->
        <p class="text-gray-500 max-w-md mb-8">
            There are no posts from any communities in the last few days.<br>
            Login or register to create the first one!
        </p>

        <!-- Buttons -->
        <div class="flex gap-4">

            <!-- Login -->
            <a
                href="/auth/login"
                class="px-5 py-2.5 rounded-xl font-medium text-white
                       bg-linear-to-r from-purple-600 to-indigo-600
                       hover:from-purple-500 hover:to-indigo-500
                       shadow-lg active:scale-[0.97]
                       transition-all duration-200"
            >
                Login
            </a>

            <!-- Register -->
            <a
                href="/auth/register"
                class="px-5 py-2.5 rounded-xl font-medium text-indigo-700
                       bg-indigo-100 hover:bg-indigo-200
                       shadow-sm active:scale-[0.97]
                       transition-all duration-200"
            >
                Register
            </a>

        </div>
    </div>
{/if}

<div class="mt-4">
    <HomePageList />
</div>
