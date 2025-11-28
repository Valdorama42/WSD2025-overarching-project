import { PUBLIC_API_URL } from '$env/static/public';
import { authFetch } from '$lib/utils/fetchUtils.js';

const readComments = async (communityId, postId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return await response.json();
};

const createComment = async (communityId, postId, commentData) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    });
    if (!response.ok) {
        throw new Error('Failed to create comment');
    }
    return await response.json();
};

const deleteComment = async (communityId, postId, commentId) => {
    const response = await authFetch(`${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
    return await response.json();
};

const upVote = async (communityId, postId, commentId) => {
    const response = await authFetch(
        `${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}/upvote`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to upvote comment');
    };
    return await response.json();
};

const downVote = async (communityId, postId, commentId) => {
    const response = await authFetch(
        `${PUBLIC_API_URL}/api/communities/${communityId}/posts/${postId}/comments/${commentId}/downvote`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to downvote comment');
    };
    return await response.json();
};

export { readComments, createComment, deleteComment, upVote, downVote };

