<script>
  import { useCommentState } from "$lib/states/commentState.svelte.js";
  import { useAuthState } from "$lib/states/authState.svelte.js";

  const commentState = useCommentState();
  const authState = useAuthState();

  let { communityId, postId } = $props();

  const removeComment = (cId, pId, commentId) => {
      commentState.removeComment(cId, pId, commentId);
  };

  const upVoteComment = (cId, pId, commentId) => {
      commentState.upVoteComment(cId, pId, commentId);
  };

  const downVoteComment = (cId, pId, commentId) => {
      commentState.downVoteComment(cId, pId, commentId);
  };
</script>

<ul class="space-y-4 mx-auto max-w-2xl">
  {#each commentState.comments[postId] ?? [] as comment}
      <li class="p-4 border rounded-lg shadow-sm bg-white">

          <p class="text-gray-700">{comment.content}</p>

          <p class="mt-2">
              Upvotes: {comment.upvotes ?? 0}, 
              Downvotes: {comment.downvotes ?? 0}
          </p>

          {#if authState.user}
              <button 
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  onclick={() => upVoteComment(communityId, postId, comment.id)}
              >
                  Upvote
              </button>

              <button 
                  class="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                  onclick={() => downVoteComment(communityId, postId, comment.id)}
              >
                  Downvote
              </button>
          {/if}

          {#if authState.user && authState.user.id === comment.created_by}
              <button 
                  class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  onclick={() => removeComment(communityId, postId, comment.id)}
              >
                  Remove
              </button>
          {/if}

      </li>
  {/each}
</ul>
