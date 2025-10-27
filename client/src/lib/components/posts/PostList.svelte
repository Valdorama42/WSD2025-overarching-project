<script>
    import { usePostState } from "$lib/states/postState.svelte.js";
    let postState = usePostState();

    let { communityId } = $props();

    const removePost = (communityId, postId) => {
        postState.removePost(communityId, postId);
    }
</script>

<ul>
    {#each postState.posts[communityId] as post}
        <li>
            <h2><a href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a></h2>
            <p>{post.content}</p>
            <button onclick={() => removePost(communityId, post.id)}>Remove</button>
        </li>
    {/each}
</ul>