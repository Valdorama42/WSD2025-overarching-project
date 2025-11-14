<script>
    import { useCommentState } from "$lib/states/commentState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    let { communityId, postId } = $props();

    const commentState = useCommentState();
    const authState = useAuthState();

    const removeComment = async (id) => {
        await commentState.removeComment(communityId, postId, id);
    };

</script>

<ul>
    {#each commentState.comments[postId] || [] as c}
      <li>
        {c.content}
        {#if authState.user && authState.user.id === c.created_by}
          <button onclick={() => removeComment(c.id)}>Remove</button>
        {/if}
      </li>
    {/each}
</ul>