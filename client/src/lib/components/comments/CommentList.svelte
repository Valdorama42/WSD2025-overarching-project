<script>
    import { useCommentState } from "$lib/states/commentState.svelte.js";

    let { communityId, postId } = $props();

    const commentState = useCommentState();

    const removeComment = async (id) => {
        await commentState.removeComment(communityId, postId, id);
    };

</script>

<ul>
    {#each commentState.comments[postId] || [] as c}
      <li>
        {c.content}
        <button onclick={() => removeComment(c.id)}>Remove</button>
      </li>
    {/each}
</ul>