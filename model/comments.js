import db from "../database.js";

// GET
export async function getComments(user_id, participation_id, limit, offset, created, rand) {
    const params = [];
    let where_stmt = ""; let order_stmt = ""; let limit_stmt = ""; let offset_stmt = "";

    if (user_id) {
        where_stmt = "WHERE c.user_id = ?";
        params.push(parseInt(user_id));
        if (participation_id) {
            where_stmt += " AND c.participation_id = ?";
            params.push(parseInt(participation_id, 10));
        }
    } else if (participation_id) {
        where_stmt = "WHERE c.participation_id = ?";
        params.push(parseInt(participation_id, 10));
    }

    if (created) {
        order_stmt = "ORDER BY c.created";
    } else if (rand) {
        order_stmt = "ORDER BY RAND()";
    }

    if (limit) {
        limit_stmt = "LIMIT ?";
        params.push(parseInt(limit, 10));
    }
    if (offset) {
        offset_stmt = "OFFSET ?";
        params.push(parseInt(offset, 10));
    }

    const sql = `
        SELECT c.*, u.first_name, u.last_name
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN participations p ON c.participation_id = p.id
        ${where_stmt}
        ${order_stmt}
        GROUP BY c.id
        ${limit_stmt}
        ${offset_stmt}
    `;
    return await db.getall(sql, params);
}
export async function getComment(id) {
	return await db.getrow(
		`SELECT * FROM comments WHERE id = ?`,
		[id]
	);
}

// POST
export async function addComment(content, user_id, participation_id) {
	return await db.insert(
		"INSERT INTO comments (content, user_id, participation_id) VALUES (?, ?, ?)",
		[content, user_id, participation_id]
	);
}

// DEL
export async function removeComment(id) {
	return await db.delete(
		"DELETE FROM comments WHERE id = ?",
		[id]
	);
}
