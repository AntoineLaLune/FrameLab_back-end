import db from "../database.js";

// GET
export async function getComments(user_id, participation_id, limit, offset, created, rand) {
    const params = [];
    let where_stmt = ""; let order_stmt = ""; let limit_stmt = ""; let offset_stmt = "";

    if (user_id) {
        where_stmt = "WHERE c.user_id = ?";
        params.push(user_id);
        if (participation_id) {
            where_stmt += " AND c.participation_id = ?";
            params.push(participation_id);
        }
    } else if (participation_id) {
        where_stmt = "WHERE c.participation_id = ?";
        params.push(participation_id);
    }

    if (created) {
        order_stmt = "ORDER BY c.created";
    } else if (rand) {
        order_stmt = "ORDER BY RAND()";
    }

    if (limit) {
        limit_stmt = "LIMIT ?";
        params.push(limit);
    }
    if (offset) {
        offset_stmt = "OFFSET ?";
        params.push(offset);
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
	const params = [];
	let where_stmt = "";

	if (id) {
		where_stmt = "WHERE id = ?";
		params.push(id)
	} else {
		if (user_id) {
			where_stmt = "WHERE user_id = ?";
			params.push(user_id)
			if (participation_id) {
				where_stmt = where_stmt + " AND participation_id = ?";
				params.push(participation_id)
			}
		} else if (participation_id) {
			where_stmt = "WHERE participation_id = ?";
			params.push(participation_id)
		}
	}

	return await db.getrow(
		`SELECT * FROM comments ${where_stmt}`,
		params
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
