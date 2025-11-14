import * as postRepository from '../repositories/postRepository.js';

const create = async (c) => {
    const user = c.get("user");
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)) {
        return c.json({ error: 'Invalid community ID' }, 400);
    }

    const body = await c.req.json();
    if (!body.title || !body.content) {
        return c.json({ error: 'Title and content are required' }, 400);
    }
    const newPost = await postRepository.create(user.id, communityId, body);
    return c.json(newPost, 201);
}

const readAll = async (c) => {
    const communityId = Number(c.req.param("communityId"));
    if (!Number.isInteger(communityId)) {
        return c.json({ error: 'Invalid community ID' }, 400);
    }

    const posts = await postRepository.findAll(communityId);
    return c.json(posts);
};

const readOne = async (c) => {
    const id = Number(c.req.param("postId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: 'Invalid post ID' }, 400);
    }

    const post = await postRepository.findById(id);
    if (!post) {
        return c.json({ error: 'Post not found' }, 404);
    }
    return c.json(post);
};

const deleteOne = async (c) => {
    const user = c.get("user");
    const id = Number(c.req.param("postId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: 'Invalid post ID' }, 400);
    }

    const deletedPost = await postRepository.deleteById(user.id, id);
    if (!deletedPost) {
        return c.json({ error: 'Post not found' }, 404);
    }
    return c.json(deletedPost, 200);
};

export { create, readAll, readOne, deleteOne };