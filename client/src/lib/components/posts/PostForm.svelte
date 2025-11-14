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
    <h2>Add a new post</h2>
    <form onsubmit={add}>
        <label>Post title:
            <input 
                type="text" 
                name="title" 
                id="title"
                placeholder="Post title" 
            />
        </label>
        <br/>
        <label>Post content:
            <textarea 
                name="content" 
                id="content" 
                placeholder="Post content">
            </textarea>
        </label>
        <br/>
        <button type="submit">Add Post</button>
    </form>
{/if}