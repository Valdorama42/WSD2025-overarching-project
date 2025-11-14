<script>
    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const postState = usePostState();
    const authState = useAuthState();

    let { communityId } = $props();

    const removePost = (communityId, postId) => {
        postState.removePost(communityId, postId);
    }
</script>

<ul>
    {#each postState.posts[communityId] ?? [] as post}
        <li>
            <h2><a href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a></h2>
            <p>{post.content}</p>
            {#if authState.user && authState.user.id === post.created_by}
                <button onclick={() => removePost(communityId, post.id)}>Remove</button>
            {/if}
        </li>
    {/each}
</ul>