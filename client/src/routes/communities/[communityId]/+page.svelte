<script>
    import Community from "$lib/components/communities/Community.svelte";
    import AddPost from "$lib/components/posts/AddPost.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";

    let { data } = $props();
    let communityId = parseInt(data.communityId);
</script>

<Community {communityId} />

<AddPost {communityId} />

<PostList {communityId} />