<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";

    const communityState = useCommunityState();
    
    const removeCommunity = (id) => {
        communityState.removeCommunity(id);
    }
</script>

<ul>
    {#each communityState.communities as community}
        <li>
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <button onclick={() => removeCommunity(community.id)}>Remove</button>
        </li>
    {/each}
</ul>