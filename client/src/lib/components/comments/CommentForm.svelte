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
<form 
    onsubmit={submit}
    class="w-full max-w-2xl mx-auto py-4 border-y border-gray-300 
           flex flex-col sm:flex-row items-start sm:items-center gap-3"
>
    <label class="flex-1 w-full">
        <span class="sr-only">Add a comment:</span>
        <textarea
            name="content"
            placeholder="Write a comment…"
            class="w-full min-h-9 max-h-[120px] sm:min-h-10
                   px-3 py-1.5 border border-gray-300 rounded-lg 
                   bg-white shadow-inner resize-y
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 
                   wrap-break-word whitespace-pre-wrap"
        ></textarea>
    </label>

    <button
        type="submit"
        class="shrink-0 px-4 py-1.5 bg-indigo-500 text-white text-sm font-medium 
               rounded-lg hover:bg-indigo-600 active:scale-95 transition-all shadow"
    >
        Send
    </button>
</form>
{/if}
  