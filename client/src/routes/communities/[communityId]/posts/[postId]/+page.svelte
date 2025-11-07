<script>
    import { initPost } from "$lib/states/postState.svelte.js";
    import Post from "$lib/components/posts/Post.svelte";

    let { data } = $props();

    let communityId = parseInt(data.communityId);
    let postId = parseInt(data.postId);

    $effect(() => {
        initPost(communityId, postId);
    });
</script>

<Post {communityId} {postId} />