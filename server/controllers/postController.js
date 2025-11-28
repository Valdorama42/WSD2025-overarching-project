import * as postRepository from "../repositories/postRepository.js";

const create = async (c) => {
  const user = c.get("user");
  const communityId = Number(c.req.param("communityId"));

  if (!Number.isInteger(communityId)) {
    return c.json({ error: "Invalid community ID" }, 400);
  }

  const body = await c.req.json();
  if (!body.title || !body.content) {
    return c.json({ error: "Title and content are required" }, 400);
  }

  const newPost = await postRepository.create(user.id, communityId, body);

  return c.json(
    {
      ...newPost,
      upvotes: 0,
      downvotes: 0,
    },
    201,
  );
};

const readAll = async (c) => {
  const communityId = Number(c.req.param("communityId"));
  if (!Number.isInteger(communityId)) {
    return c.json({ error: "Invalid community ID" }, 400);
  }

  const posts = await postRepository.findAll(communityId);

  const result = await Promise.all(
    posts.map(async (post) => {
      const upvotes = await postRepository.countUpVotes(post.id);
      const downvotes = await postRepository.countDownVotes(post.id);
      
      return {
        ...post,
        upvotes,
        downvotes,
      };
    }),
  );
  return c.json(result, 200);
};

const readOne = async (c) => {
  const id = Number(c.req.param("postId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid post ID" }, 400);
  }

  const post = await postRepository.findById(id);
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  const upvotes = await postRepository.countUpVotes(id);
  const downvotes = await postRepository.countDownVotes(id);

  return c.json({
    ...post,
    upvotes,
    downvotes,
  }, 200);
};

const deleteOne = async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("postId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid post ID" }, 400);
  }

  const deletedPost = await postRepository.deleteById(user.id, id);
  if (!deletedPost) {
    return c.json({ error: "Post not found" }, 404);
  }
  return c.json(deletedPost, 200);
};

const upVote = async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const postId = Number(c.req.param("postId"));
  if (!Number.isInteger(postId)) {
    return c.json({ error: "Invalid post ID" }, 400);
  }

  const post = await postRepository.upVote(user.id, postId);
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  const upvotes = await postRepository.countUpVotes(postId);
  const downvotes = await postRepository.countDownVotes(postId);

  return c.json(
    {
      ...post,
      upvotes,
      downvotes,
    },
    200,
  );
};

const downVote = async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const postId = Number(c.req.param("postId"));
  if (!Number.isInteger(postId)) {
    return c.json({ error: "Invalid post ID" }, 400);
  }

  const post = await postRepository.downVote(user.id, postId);
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  const upvotes = await postRepository.countUpVotes(postId);
  const downvotes = await postRepository.countDownVotes(postId);

  return c.json(
    {
      ...post,
      upvotes,
      downvotes,
    },
    200,
  );
};

export { create, readAll, readOne, deleteOne, upVote, downVote };
