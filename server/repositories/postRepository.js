import postgres from "postgres";

const sql = postgres();

const create = async (userId, communityId, post) => {
  const result = await sql`
    INSERT INTO posts (community_id, title, content, created_by)
    VALUES (${communityId}, ${post.title}, ${post.content}, ${userId})
    RETURNING *;
  `;
  return {
    ...result[0],
    upvotes: 0,
    downvotes: 0,
  };
};

const findAll = async (communityId) => {
  return await sql`
    SELECT * FROM posts
    WHERE community_id = ${communityId};
  `;
};

const findById = async (id) => {
  const result = await sql`
    SELECT * FROM posts
    WHERE id = ${id};
  `;
  return result[0];
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

const upVote = async (userId, postId) => {
  const post = await findById(postId);
  if (!post) return null;

  await sql`
    DELETE FROM votes
    WHERE user_id = ${userId} AND post_id = ${postId};
  `;
  await sql`
    INSERT INTO votes (user_id, post_id, vote)
    VALUES (${userId}, ${postId}, 'upvote');
  `;
  return post;
};

const downVote = async (userId, postId) => {
  const post = await findById(postId);
  if (!post) return null;

  await sql`
    DELETE FROM votes
    WHERE user_id = ${userId} AND post_id = ${postId};
  `;
  await sql`
    INSERT INTO votes (user_id, post_id, vote)
    VALUES (${userId}, ${postId}, 'downvote');
  `;
  return post;
};

const countUpVotes = async (postId) => {
  const result = await sql`
    SELECT COUNT(*) FROM votes
    WHERE post_id = ${postId} AND vote = 'upvote';
  `;
  return Number(result[0].count);
};

const countDownVotes = async (postId) => {
  const result = await sql`
    SELECT COUNT(*) FROM votes
    WHERE post_id = ${postId} AND vote = 'downvote';
  `;
  return Number(result[0].count);
};

export {
  create,
  findAll,
  findById,
  deleteById,
  upVote,
  downVote,
  countUpVotes,
  countDownVotes,
};
