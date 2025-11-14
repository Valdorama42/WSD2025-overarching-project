import postgres from "postgres";

const sql = postgres();

const findAll = async (postId) => {
    return await sql`
        SELECT * 
        FROM posts 
        WHERE parent_post_id = ${postId};`;
};

const create = async (userId, communityId, postId, comment) => {
    const result = await sql`
        INSERT INTO posts (content, community_id, parent_post_id, created_by)
        VALUES (${comment.content}, ${communityId}, ${postId}, ${userId})
        RETURNING *;`;
    return result[0];
};

const deleteById = async (userId, id) => {
    const result = await sql`
        DELETE FROM posts 
        WHERE id = ${id} AND created_by = ${userId}
        RETURNING *;`;
    return result[0];
}

export { findAll, create, deleteById };