<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte";

    const communityState = useCommunityState();
    const authState = useAuthState();
    
    const removeCommunity = (id) => {
        communityState.removeCommunity(id);
    }
</script>

<ul>
    {#each communityState.communities as community}
        <li>
            <h2><a href={`/communities/${community.id}`}>{community.name}</a></h2>
            <p>{community.description}</p>

            {#if authState.user && authState.user.id === community.created_by} 
                <button onclick={() => removeCommunity(community.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>