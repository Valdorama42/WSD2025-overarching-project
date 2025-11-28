<script>
    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const postState = usePostState();
    const authState = useAuthState();

    let { communityId } = $props();

    const removePost = (cId, pId) => {
        postState.removePost(cId, pId);
    };

    const upVote = (cId, pId) => {
        postState.upVotePost(cId, pId);
    };

    const downVote = (cId, pId) => {
        postState.downVotePost(cId, pId);
    };
</script>

<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 mx-auto max-w-6xl">
    {#each postState.posts[communityId] ?? [] as post}
        <li class="group relative rounded-2xl border bg-white shadow-sm overflow-hidden 
                   hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <script>
                let hoverUp = false;
                let hoverDown = false;
            </script>

            <!-- Decorative gradient top bar -->
            <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r 
                        from-blue-500 via-indigo-500 to-purple-500 opacity-60"></div>

            <div class="p-6 flex flex-col h-full">
                <!-- Title -->
                <h2 class="text-lg font-semibold tracking-tight text-gray-900 
                           group-hover:text-indigo-600 transition-colors">
                    <a href={`/communities/${communityId}/posts/${post.id}`}>
                        {post.title}
                    </a>
                </h2>

                <!-- Content -->
                <p class="text-gray-600 mt-2 line-clamp-4">
                    {post.content}
                </p>

                <!-- Voting Section -->
                {#if authState.user}
                    <div class="flex items-center gap-3 mt-4">

                        <!-- Hover States -->
                        <script>
                            let hoverUp = false;
                            let hoverDown = false;
                        </script>

                        <!-- Upvote Button -->
                        <button
                            onmouseenter={() => hoverUp = true}
                            onmouseleave={() => hoverUp = false}
                            onclick={() => upVote(communityId, post.id)}
                            class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700
                                   hover:bg-green-100 hover:text-green-700
                                   shadow-sm active:scale-95 transition-all"
                        >
                            {#if hoverUp}
                                Upvote
                            {:else}
                                👍 {post.upvotes ?? 0}
                            {/if}
                        </button>

                        <!-- Downvote Button -->
                        <button
                            onmouseenter={() => hoverDown = true}
                            onmouseleave={() => hoverDown = false}
                            onclick={() => downVote(communityId, post.id)}
                            class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700
                                   hover:bg-red-100 hover:text-red-700
                                   shadow-sm active:scale-95 transition-all"
                        >
                            {#if hoverDown}
                                Downvote
                            {:else}
                                👎 {post.downvotes ?? 0}
                            {/if}
                        </button>
                    </div>
                {/if}

                <!-- Remove Post Button -->
                {#if authState.user && authState.user.id === post.created_by}
                    <button 
                        class="mt-5 px-3 py-1.5 rounded-md bg-red-400 text-white 
                               hover:bg-red-500 active:scale-95 transition-all shadow-sm"
                        onclick={() => removePost(communityId, post.id)}
                    >
                        Remove
                    </button>
                {/if}
            </div>
        </li>
    {/each}
</ul>



