<script>
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";

    const homePage = useHomePageState();
</script>


<div>
    <ul class="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each homePage.posts as post}
            <li 
                class="relative py-3 px-5 bg-white border rounded-2xl shadow-sm
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                       overflow-hidden"
            >
                <!-- decorative gradient glow -->
                <div 
                    class="absolute inset-0 opacity-10 bg-linear-to-br 
                           from-indigo-500 via-purple-500 to-pink-500 pointer-events-none"
                ></div>

                <h2 class="text-xl font-semibold text-indigo-700 hover:underline relative z-10">
                    <a href={`/communities/${post.community_id}/posts/${post.id}`}>
                        {post.title}
                    </a>
                </h2>

                <p class="text-gray-800 mt-2 leading-relaxed relative z-10">
                    {post.content}
                </p>

                <!-- footer row -->
                <div class="mt-4 flex items-center justify-between text-sm text-gray-600 relative z-10">
                    <p>
                        👍 {post.upvotes} &nbsp;&nbsp;
                        👎 {post.downvotes} &nbsp;&nbsp;
                        💬 {post.comments}
                    </p>

                    <span class="text-xs text-gray-400">
                        Community: {post.community_id}
                    </span>
                </div>
            </li>
        {/each}
    </ul>
</div>
