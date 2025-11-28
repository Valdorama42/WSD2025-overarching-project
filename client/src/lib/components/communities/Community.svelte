<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";

    let communityState = useCommunityState();

    let { communityId } = $props();

    let community = $derived(communityState.communities.find((c) => c.id === communityId));
</script>

<div class="bg-white rounded-2xl shadow-md border border-gray-200 p-6 
            backdrop-blur-sm relative overflow-hidden">

    <!-- decorative soft corner gradient -->
    <div class="absolute -top-8 -right-8 w-32 h-32 bg-linear-to-br 
                from-indigo-100 via-purple-100 to-transparent rounded-full opacity-50 pointer-events-none">
    </div>

    <h1 class="text-2xl font-semibold text-gray-900 tracking-tight relative z-10">
        {community ? community.name : "Loading..."}
    </h1>

    <div class="my-3 h-px w-full bg-gray-200 relative z-10"></div>

    <p class="text-sm text-gray-700 leading-relaxed relative z-10">
        {community ? community.description : ""}
    </p>
</div>

