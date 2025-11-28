import * as commentRepository from "../repositories/commentRepository.js";

const create = async (c) => {
  const user = c.get("user");
  const communityId = Number(c.req.param("communityId"));
  const postId = Number(c.req.param("postId"));

  if (!Number.isInteger(communityId) || !Number.isInteger(postId)) {
    return c.json({ error: "Invalid ID" }, 400);
  }

  const body = await c.req.json();
  if (!body.content) {
    return c.json({ error: "Content is required" }, 400);
  }

  const newComment = await commentRepository.create(
    user.id,
    communityId,
    postId,
    body,
  );

  return c.json(
    {
      ...newComment,
      title: null,
      upvotes: 0,
      downvotes: 0
    },
    201
  );
};


const readAll = async (c) => {
  const postId = Number(c.req.param("postId"));
  if (!Number.isInteger(postId)) {
    return c.json({ error: "Invalid post ID" }, 400);
  }

  const comments = await commentRepository.findAll(postId);

  const result = await Promise.all(
    comments.map(async (comment) => ({
      ...comment,
      title: null,
      upvotes: await commentRepository.countUpVotes(comment.id),
      downvotes: await commentRepository.countDownVotes(comment.id)
    }))
  );

  return c.json(result, 200);
};


const deleteOne = async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("commentId"));

  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid comment ID" }, 400);
  }

  const deletedComment = await commentRepository.deleteById(user.id, id);
  if (!deletedComment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  return c.json(deletedComment, 200);
};


const upVote = async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const commentId = Number(c.req.param("commentId"));
  if (!Number.isInteger(commentId)) {
    return c.json({ error: "Invalid comment ID" }, 400);
  }

  const comment = await commentRepository.upVote(user.id, commentId);
  if (!comment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  const upvotes = await commentRepository.countUpVotes(commentId);
  const downvotes = await commentRepository.countDownVotes(commentId);

  return c.json(
    {
      ...comment,
      title: null,
      upvotes,
      downvotes
    },
    200
  );
};


const downVote = async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const commentId = Number(c.req.param("commentId"));
  if (!Number.isInteger(commentId)) {
    return c.json({ error: "Invalid comment ID" }, 400);
  }

  const comment = await commentRepository.downVote(user.id, commentId);
  if (!comment) {
    return c.json({ error: "Comment not found" }, 404);
  }

  const upvotes = await commentRepository.countUpVotes(commentId);
  const downvotes = await commentRepository.countDownVotes(commentId);

  return c.json(
    {
      ...comment,
      title: null,
      upvotes,
      downvotes
    },
    200
  );
};


export { create, readAll, deleteOne, upVote, downVote };
