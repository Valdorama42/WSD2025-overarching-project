<script>
    import { usePostState } from "$lib/states/postState.svelte.js";

    let postState = usePostState();

    let { communityId, postId } = $props();

    let post = $derived(
        postState.posts[communityId]?.find((p) => p.id === postId)
    );
</script>

<h1>{post ? post.title : "Loading..."}</h1>
<p>{post ? post.content : ""}</p>