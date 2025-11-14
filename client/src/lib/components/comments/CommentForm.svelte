<script>
    import { useCommentState } from "$lib/states/commentState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";
  
    let { communityId, postId } = $props();

    const commentState = useCommentState();
    const authState = useAuthState();
  
    const submit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      await commentState.addComment(communityId, postId, data);
      e.target.reset();
    };
</script>
  
{#if authState.user}
  <form onsubmit={submit}>
    <label>Add a comment:
        <textarea name="content" placeholder="Comment content"></textarea>
    </label>
    <br />
    <button type="submit">Add comment</button>
  </form>
{/if}
  