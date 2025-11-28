import { browser } from '$app/environment';
import * as commentsApi from '$lib/apis/commentsApi.js';

let commentState = $state({}); // { [postId]: [comments] }

const initComments = async (communityId, postId) => {
    if (!browser) {
        return;
    }
    commentState[postId] = await commentsApi.readComments(communityId, postId);
};

const useCommentState = () => ({
    get comments() {
        return commentState;
    },
    addComment: (communityId, postId, comment) => {
        commentsApi.createComment(communityId, postId, comment).then((newComment) => {
            const comments = commentState[postId] || [];
            comments.push(newComment);
            commentState[postId] = comments;
        });
    },
    removeComment: (communityId, postId, commentId) => {
        commentsApi.deleteComment(communityId, postId, commentId).then(() => {
            const comments = commentState[postId] || [];
            commentState[postId] = comments.filter((comment) => comment.id !== commentId);
        });
    },
    upVoteComment: (communityId, postId, commentId) => {
        commentsApi.upVote(communityId, postId, commentId).then((updatedComment) => {
            const comments = commentState[postId] || [];
            commentState[postId] = comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment
            );
        });
    },
    downVoteComment: (communityId, postId, commentId) => {
        commentsApi.downVote(communityId, postId, commentId).then((updatedComment) => {
            const comments = commentState[postId] || [];
            commentState[postId] = comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment
            );
        });
    },
});

export { initComments, useCommentState };