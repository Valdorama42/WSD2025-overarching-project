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

<ul class="space-y-4 mx-auto max-w-2xl">
    {#each postState.posts[communityId] ?? [] as post}
        <li class="p-4 border rounded-lg shadow-sm bg-white">
            <h2 class="text-lg font-semibold text-blue-600 hover:underline">
                <a href={`/communities/${communityId}/posts/${post.id}`}>{post.title}</a>
            </h2>
            <p class="text-gray-700 mt-2">{post.content}</p>
            {#if authState.user && authState.user.id === post.created_by}
                <button 
                    class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onclick={() => removePost(communityId, post.id)}
                >
                    Remove
                </button>
            {/if}
        </li>
    {/each}
</ul>