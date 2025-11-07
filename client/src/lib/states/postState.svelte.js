import { browser } from "$app/environment";
import * as postsApi from "$lib/apis/postsApi.js";

let postState = $state({});

const initPosts = async (todoId) => {
    if (!browser) return;
    postState = await postsApi.readPosts(todoId);
}

const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        addPost: (communityId, post) => {
            postsApi.createPost(communityId, post).then((newPost) => {
                const posts = postState[communityId] || [];
                posts.push(newPost);
                postState[communityId] = posts;
            });
        },
        removePost: (communityId, postId) => {
            postsApi.deletePost(communityId, postId).then(() => {
                const posts = postState[communityId] || [];
                postState[communityId] = posts.filter(post => post.id !== postId);
            });
        },
    };
};

export { usePostState, initPosts };