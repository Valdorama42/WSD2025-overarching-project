import * as commentRepository from "../repositories/commentRepository.js";

const create = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId) || !Number.isInteger(communityId)) {
        return c.json({ error: 'Invalid ID' }, 400);
    }

    const comment = await c.req.json();
    if (!comment.content) {
        return c.json({ error: 'Content is required' }, 400);
    }
    const newComment = await commentRepository.create(communityId, postId, comment);
    return c.json(newComment, 201);
};

const readAll = async (c) => {
    const postId = Number(c.req.param("postId"));
    if (!Number.isInteger(postId)) {
        return c.json({ error: 'Invalid post ID' }, 400);
    }

    const comments = await commentRepository.findAll(postId);
    return c.json(comments);
};

const deleteOne = async (c) => {
    const id = Number(c.req.param("commentId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: 'Invalid comment ID' }, 400);
    }

    const deletedComment = await commentRepository.deleteById(id);
    if (!deletedComment) {
        return c.json({ error: 'Comment not found' }, 404);
    }
    return c.json(deletedComment);
};

export { create, readAll, deleteOne };