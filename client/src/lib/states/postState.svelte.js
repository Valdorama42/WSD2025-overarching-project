import { browser } from '$app/environment';

const POSTS_KEY = "posts";
let initialPosts = {};

if (browser && localStorage.getItem(POSTS_KEY) != null) {
    initialPosts = JSON.parse(localStorage.getItem(POSTS_KEY));
}

let postState = $state(initialPosts);

const savePosts = () => {
    localStorage.setItem(POSTS_KEY, JSON.stringify(postState));
}

const usePostState = () => {
    return {
        get posts() {
            return postState;
        },
        getPost: (communityId, postId) => {
            let community = postState[communityId] || [];
            return community.find(post => post.id === postId);
        },
        addPost: (id, title, content) => {
            if (!postState[id]) {
                postState[id] = [];
            }
            let community = postState[id];
            community.push({ id: todo.length + 1, title, content });
            savePosts();
        },
        removePost: (id, postId) => {
            let community = postState[id];
            postState[id] = community.filter(post => post.id !== postId);
            savePosts();
        },
    };
};

export { usePostState };