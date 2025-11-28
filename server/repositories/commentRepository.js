import postgres from "postgres";

const sql = postgres();

const findAll = async (postId) => {
  return await sql`
    SELECT *
    FROM posts
    WHERE parent_post_id = ${postId};
  `;
};

const findById = async (id) => {
  const result = await sql`
    SELECT *
    FROM posts
    WHERE id = ${id};
  `;
  return result[0];
};

const create = async (userId, communityId, postId, comment) => {
  const result = await sql`
    INSERT INTO posts (content, community_id, parent_post_id, created_by)
    VALUES (${comment.content}, ${communityId}, ${postId}, ${userId})
    RETURNING *;
  `;
  return {
    ...result[0],
    upvotes: 0,
    downvotes: 0,
  };
};

const deleteById = async (userId, id) => {
  const result = await sql`
    DELETE FROM posts
    WHERE id = ${id} AND created_by = ${userId}
    RETURNING *;
  `;
  return result[0];
};

// voting helpers

const upVote = async (userId, commentId) => {
  const comment = await findById(commentId);
  if (!comment) return null;

  await sql`
    DELETE FROM votes
    WHERE user_id = ${userId} AND post_id = ${commentId};
  `;
  await sql`
    INSERT INTO votes (user_id, post_id, vote)
    VALUES (${userId}, ${commentId}, 'upvote');
  `;
  return comment;
};

const downVote = async (userId, commentId) => {
  const comment = await findById(commentId);
  if (!comment) return null;

  await sql`
    DELETE FROM votes
    WHERE user_id = ${userId} AND post_id = ${commentId};
  `;
  await sql`
    INSERT INTO votes (user_id, post_id, vote)
    VALUES (${userId}, ${commentId}, 'downvote');
  `;
  return comment;
};

const countUpVotes = async (commentId) => {
  const result = await sql`
    SELECT COUNT(*)
    FROM votes
    WHERE post_id = ${commentId} AND vote = 'upvote';
  `;
  return Number(result[0].count);
};

const countDownVotes = async (commentId) => {
  const result = await sql`
    SELECT COUNT(*)
    FROM votes
    WHERE post_id = ${commentId} AND vote = 'downvote';
  `;
  return Number(result[0].count);
};

export {
  findAll,
  findById,
  create,
  deleteById,
  upVote,
  downVote,
  countUpVotes,
  countDownVotes,
};
