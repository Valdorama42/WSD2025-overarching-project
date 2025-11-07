<script>
    import { initCommunities } from "$lib/states/communityState.svelte.js";
    import CommunityList from "$lib/components/communities/CommunityList.svelte";
    import CommunityForm from "$lib/components/communities/CommunityForm.svelte";

    $effect(() => {
        initCommunities();
    });
</script>

<h1>Communities</h1>

<CommunityForm />

<CommunityList />