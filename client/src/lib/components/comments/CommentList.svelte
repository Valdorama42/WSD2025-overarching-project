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

<ul class="space-y-4 mx-auto max-w-3xl">
    {#each commentState.comments[postId] ?? [] as comment}
        <li
            class="relative bg-white border rounded-xl shadow-sm p-4 pl-5 
                   hover:shadow-md transition-all duration-200"
        >
            <!-- Subtle left accent bar -->
            <div
                class="absolute left-0 top-0 h-full w-1.5 
                       bg-linear-to-b from-blue-500 to-indigo-500 rounded-l-lg opacity-60"
            ></div>

            <!-- Comment text -->
            <p class="text-gray-800 leading-relaxed wrap-break-word whitespace-pre-line">
                {comment.content}
            </p>

            <!-- Voting row -->
            <div class="flex items-center gap-2 mt-3">

                <!-- Upvote button -->
                {#if authState.user}
                    <button
                        class="group px-3 py-1.5 rounded-md border text-sm 
                               bg-gray-100 hover:bg-green-500 hover:text-white
                               transition-all active:scale-[0.97]"
                        onclick={() => upVoteComment(communityId, postId, comment.id)}
                    >
                        <span class="block group-hover:hidden">
                            👍 {comment.upvotes ?? 0}
                        </span>
                        <span class="hidden group-hover:block">
                            Upvote
                        </span>
                    </button>

                    <!-- Downvote button -->
                    <button
                        class="group px-3 py-1.5 rounded-md border text-sm 
                               bg-gray-100 hover:bg-red-500 hover:text-white
                               transition-all active:scale-[0.97]"
                        onclick={() => downVoteComment(communityId, postId, comment.id)}
                    >
                        <span class="block group-hover:hidden">
                            👎 {comment.downvotes ?? 0}
                        </span>
                        <span class="hidden group-hover:block">
                            Downvote
                        </span>
                    </button>
                {/if}

                <!-- Remove button -->
                {#if authState.user && authState.user.id === comment.created_by}
                    <button
                        class="ml-auto px-3 py-1 text-sm rounded-md 
                               bg-red-400 text-white hover:bg-red-500 
                               shadow-sm active:scale-[0.97] transition-all"
                        onclick={() =>
                            removeComment(communityId, postId, comment.id)
                        }
                    >
                        Remove
                    </button>
                {/if}
            </div>
        </li>
    {/each}
</ul>