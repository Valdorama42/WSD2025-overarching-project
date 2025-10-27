<script>
    import { usePostState } from "$lib/states/postState.svelte.js";
    
    let postState = usePostState();
    let { communityId } = $props();

    let title = $state("");
    let content = $state("");

    const addPost = () => {
        postState.addPost(communityId, title, content);
        title = "";
        content = "";
    }
</script>

<input type="text" bind:value={title} placeholder="Post title" />
<input type="text" bind:value={content} placeholder="Post content"/>
    
<button onclick={addPost}>Add Post</button>