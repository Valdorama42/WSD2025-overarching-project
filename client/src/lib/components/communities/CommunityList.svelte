<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte";

    const communityState = useCommunityState();
    const authState = useAuthState();
    
    const removeCommunity = (id) => {
        communityState.removeCommunity(id);
    }
</script>

<ul class="grid gap-6 md:grid-cols-2 mt-10 mx-auto max-w-6xl">
    {#each communityState.communities as community}
        <li class="group relative rounded-2xl border bg-white shadow-sm overflow-hidden 
                   hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <!-- Decorative gradient bar -->
            <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r 
                        from-blue-500 via-indigo-500 to-purple-500 opacity-60"></div>

            <div class="p-6 flex flex-col h-full">
                <h2 class="text-xl font-bold tracking-tight text-gray-900 
                           group-hover:text-indigo-600 transition-colors">
                    <a href={`/communities/${community.id}`}>
                        {community.name}
                    </a>
                </h2>

                <p class="text-gray-600 mt-2 leading-relaxed">
                    {community.description}
                </p>

                <div class="mt-auto pt-4 flex justify-between items-center">
                    <span class="text-xs text-gray-400">
                        Created by ID: {community.created_by}
                    </span>

                    {#if authState.user && authState.user.id === community.created_by}
                        <button 
                            class="px-3 py-1.5 text-sm rounded-md bg-red-400 text-white 
                                   hover:bg-red-500 active:scale-95 transition-all shadow-sm"
                            onclick={() => removeCommunity(community.id)}
                        >
                            Remove
                        </button>
                    {/if}
                </div>
            </div>
        </li>
    {/each}
</ul>
