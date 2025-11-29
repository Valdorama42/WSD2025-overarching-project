<script>
    import { initCommunities } from "$lib/states/communityState.svelte.js";
    import CommunityList from "$lib/components/communities/CommunityList.svelte";
    import CommunityForm from "$lib/components/communities/CommunityForm.svelte";
    import { useAuthState } from "$lib/states/authState.svelte";
    import { useCommunityState } from "$lib/states/communityState.svelte.js";

    const authState = useAuthState();
    const communityState = useCommunityState();

    $effect(() => {
        initCommunities();
    });
</script>

<svelte:head>
    <title>Communities</title>
</svelte:head>

<h1 class="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
    Communities
</h1>


<div>
    <!-- Form Section -->
    {#if authState.user}
        <section class="mx-auto w-full">
            <CommunityForm />
        </section>
    {/if}

    {#if communityState.communities.length === 0}
    <div class="flex flex-col items-center text-center py-20 text-gray-600">

        <!-- Icon / illustration -->
        <div class="mb-6 text-indigo-600">
            <svg class="w-16 h-16 mx-auto opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </div>

        <h2 class="text-2xl font-semibold text-gray-800 mb-3">
            No communities yet
        </h2>

        <p class="text-gray-500 max-w-md mb-8">
            There are no communities created yet.  
            Login to create one or explore existing ones once they appear.
        </p>

        <div class="flex gap-4">
            <!-- Go to login -->
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

            <!-- Go to register -->
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

    <!-- List Section -->
    <section>
        <CommunityList />
    </section>
</div>
