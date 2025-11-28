<script>
    import { useHomePageState } from "$lib/states/homePageState.svelte.js";

    const homePage = useHomePageState();
</script>

<ul class="space-y-4 mx-auto max-w-2xl">
    {#each homePage.posts as post}
        <li class="p-4 border rounded-lg shadow-sm bg-white">
            <h2 class="text-lg font-semibold text-blue-600 hover:underline">
                <a href={`/communities/${post.community_id}/posts/${post.id}`}>
                    {post.title}
                </a>
            </h2>

            <p class="text-gray-700 mt-2">{post.content}</p>

            <p class="text-sm mt-2 text-gray-600">
                Upvotes: {post.upvotes}, 
                Downvotes: {post.downvotes}, 
                Comments: {post.comments}
            </p>
        </li>
    {/each}
</ul>
