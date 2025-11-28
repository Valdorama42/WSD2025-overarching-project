<script>
    import { usePostState } from "$lib/states/postState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    let { communityId } = $props();

    const postState = usePostState();
    const authState = useAuthState();

    const add = (e) => {
        e.preventDefault();
        const post = Object.fromEntries(new FormData(e.target));
        postState.addPost(communityId, post);
        e.target.reset();
    };
</script>


{#if authState.user}
<div
    class="mx-auto mt-10 p-8 rounded-2xl shadow-lg border bg-white/70 backdrop-blur 
           relative overflow-hidden transition-all">

    <!-- Decorative gradient top bar -->
    <div class="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r 
                from-indigo-500 via-blue-500 to-cyan-400"></div>

    <h2 class="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
        Add a New Post
    </h2>

    <form onsubmit={add} class="space-y-6">

        <!-- Title input -->
        <label class="block">
            <span class="text-sm font-medium text-gray-700">Post title</span>
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Post title"
                class="mt-1 w-full px-4 py-2 rounded-lg border shadow-sm bg-white 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       transition-all"
            />
        </label>

        <!-- Content textarea -->
        <label class="block">
            <span class="text-sm font-medium text-gray-700">Post content</span>
            <textarea
                name="content"
                id="content"
                placeholder="Write your post content here..."
                class="mt-1 w-full h-32 px-4 py-2 rounded-lg border shadow-sm bg-white 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       transition-all resize-none"
            ></textarea>
        </label>

        <button
            type="submit"
            class="w-full py-2.5 rounded-lg text-white font-semibold 
                   bg-linear-to-r from-blue-600 to-indigo-600 
                   hover:from-blue-700 hover:to-indigo-700 
                   shadow-md hover:shadow-lg active:scale-[0.98]
                   transition-all"
        >
            Add Post
        </button>
    </form>
</div>
{/if}