<script>
    import { initCommunity } from "$lib/states/communityState.svelte.js";
    import { initPosts } from "$lib/states/postState.svelte.js";
    import Community from "$lib/components/communities/Community.svelte";
    import PostForm from "$lib/components/posts/PostForm.svelte";
    import PostList from "$lib/components/posts/PostList.svelte";

    let { data } = $props();
    let communityId = parseInt(data.communityId);

    $effect(() => {
        initCommunity(communityId);
        initPosts(communityId);
    });
</script>

<svelte:head>
    <title>Community {communityId}</title>
</svelte:head>

<div class="max-w-5xl mx-auto space-y-12">

    <!-- Community Header -->
    <section>
        <Community {communityId} />
    </section>

    <!-- Create Post -->
    <section>
        <PostForm {communityId} />
    </section>

    <!-- Posts List -->
    <section class="pt-4">
        <h2 class="text-3xl font-semibold text-gray-900 mb-5 tracking-tight">
            Posts in this Community
        </h2>

        <PostList {communityId} />
        
    </section>
</div>