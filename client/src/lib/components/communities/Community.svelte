<script>
    import { useCommunityState } from "$lib/states/communityState.svelte.js";

    let communityState = useCommunityState();

    let { communityId } = $props();

    let community = communityState.getOne(communityId);
</script>

<h1>{community ? community.name : "Loading..."}</h1>
<p>{community ? community.description : ""}</p>