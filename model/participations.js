import db from "../database.js";

// GET
export async function getParticipations(user_id, challenge_id, limit, offset, created, rand) {
	const params = [];
	let where_stmt = "", order_stmt = "", limit_stmt = "", offset_stmt = "";

	if (user_id) {
		where_stmt = "WHERE p.user_id = ?";
		params.push(user_id)
		if (challenge_id) {
			where_stmt = where_stmt + " AND p.challenge_id = ?";
			params.push(challenge_id)
		}
	} else if (challenge_id) {
		where_stmt = "WHERE p.challenge_id = ?";
		params.push(challenge_id)
	}

	if (created) {
		order_stmt = "ORDER BY created";
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

	return await db.getall(
		`SELECT p.*,
			u.first_name, u.last_name,
			AVG(v.creativity_note) as creativity_note,
			AVG(v.technical_note) as technical_note,
			AVG(v.respect_theme_note) as respect_theme_note
		FROM participations p
			LEFT JOIN votes v ON v.participation_id = p.id
			LEFT JOIN users u ON p.user_id = u.id
		${where_stmt}
		${order_stmt}
		GROUP BY p.id
		${limit_stmt}
		${offset_stmt}`,
		params
	);
}
export async function getParticipation(id) {
	return await db.getrow(
		`SELECT p.*,
			u.first_name, u.last_name,
			AVG(v.creativity_note) as creativity_note,
			AVG(v.technical_note) as technical_note,
			AVG(v.respect_theme_note) as respect_theme_note
		FROM participations p
			LEFT JOIN votes v ON v.participation_id = p.id
			LEFT JOIN users u ON p.user_id = u.id
		WHERE id = ?`,
		[id]
	);
}

// POST
export async function addParticipation(photo_url, challenge_id, user_id) {
	return await db.insert(
		"INSERT INTO participations (photo_url, challenge_id, user_id) VALUES (?, ?, ?)",
		[photo_url, challenge_id, user_id]
	);
}

// DEL
export async function removeParticipation(id) {
	return await db.delete(
		"DELETE FROM participations WHERE id = ?",
		[id]
	);
}
