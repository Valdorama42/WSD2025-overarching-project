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

<Post {communityId} {postId} />

<CommentForm {communityId} {postId} />

<CommentList {communityId} {postId} />