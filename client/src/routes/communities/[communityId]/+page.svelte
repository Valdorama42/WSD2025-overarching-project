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

<Community {communityId} />

<PostForm {communityId} />

<PostList {communityId} />