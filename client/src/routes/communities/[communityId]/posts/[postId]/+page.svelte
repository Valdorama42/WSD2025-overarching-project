<script>
    import { initPost } from "$lib/states/postState.svelte.js";
    import Post from "$lib/components/posts/Post.svelte";
    import CommentList from "$lib/components/comments/CommentList.svelte";
    import { initComments } from "$lib/states/commentState.svelte.js";
    import CommentForm from "$lib/components/comments/CommentForm.svelte";

    let { data } = $props();

    let communityId = parseInt(data.communityId);
    let postId = parseInt(data.postId);

    $effect(() => {
        initPost(communityId, postId);
        initComments(communityId, postId);
    });
</script>

<svelte:head>
    <title>Post {postId}</title>
</svelte:head>

<!-- PAGE WRAPPER -->
<div class="max-w-3xl mx-auto px-4 space-y-5">

    <!-- POST CONTENT -->
    <section>
        <Post {communityId} {postId} />
    </section>

    <!-- COMMENT FORM with subtle separators -->
    <section class="pt-6 border-gray-300">
        <CommentForm {communityId} {postId} />
    </section>

    <!-- COMMENT LIST with bottom spacing -->
    <section class="pb-6 border-b border-gray-300">
        <CommentList {communityId} {postId} />
    </section>

</div>