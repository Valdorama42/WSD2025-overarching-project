<script>
    import { usePostState } from "$lib/states/postState.svelte.js";

    let postState = usePostState();

    let { communityId, postId } = $props();

    let post = $derived(
        postState.posts[communityId]?.find((p) => p.id === postId)
    );
</script>


<div class="relative bg-white rounded-2xl shadow-lg border px-8 py-5 mx-auto max-w-3xl mt-10">

    <!-- Decorative corner accent -->
    <div class="absolute -top-8 -right-8 w-32 h-32 bg-linear-to-br 
                from-indigo-100 via-purple-100 to-transparent rounded-full opacity-50 pointer-events-none">
    </div>

    <!-- Post title -->
    <h1 class="text-2xl font-bold text-gray-900 tracking-tight pr-10">
        {post ? post.title : "Loading..."}
    </h1>

    <div class="mb-3 h-px w-full bg-gray-200 relative z-10"></div>

    <!-- Content -->
    <p class="text-gray-800 text-md leading-relaxed whitespace-pre-line">
        {post ? post.content : ""}
    </p>

</div>