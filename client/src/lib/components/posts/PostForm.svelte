<script>
    import { usePostState } from "$lib/states/postState.svelte.js";

    let { todoId } = $props();

    let postState = usePostState();

    const add = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const post = Object.fromEntries(data);
        postState.addPost(todoId, post);
        e.target.reset();
    };
</script>

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