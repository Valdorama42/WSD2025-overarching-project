<script>
    import Post from "$lib/components/posts/Post.svelte";

    let { data } = $props();

    let communityId = parseInt(data.communityId);
    let postId = parseInt(data.postId);
</script>

<Post communityId={communityId} postId={postId} />