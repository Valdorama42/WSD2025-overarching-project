import { browser } from "$app/environment";
import * as postsApi from "$lib/apis/postsApi.js";

let postState = $state({});

const initPosts = async (communityId) => {
    if (!browser) {
        return; 
    }
    postState[communityId] = await postsApi.readPosts(communityId);
};

const initPost = async (communityId, postId) => {
    if (!browser) {
        return;
    }
    const post = await postsApi.readPost(communityId, postId);
    postState[communityId] = [post];
};


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

        upVotePost: (communityId, postId) => {
            postsApi.upVote(communityId, postId).then((updatedPost) => {
                const posts = postState[communityId] || [];

                postState[communityId] = posts.map(p =>
                    p.id === postId ? updatedPost : p
                );
            });
        },

        downVotePost: (communityId, postId) => {
            postsApi.downVote(communityId, postId).then((updatedPost) => {
                const posts = postState[communityId] || [];

                postState[communityId] = posts.map(p =>
                    p.id === postId ? updatedPost : p
                );
            });
        }
    };
};

export { usePostState, initPosts, initPost };