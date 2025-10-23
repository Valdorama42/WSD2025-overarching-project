<script>
    import Community from "$lib/components/communities/Community.svelte";

    let { data } = $props();
    let communityId = parseInt(data.communityId);
</script>

<Community {communityId} />