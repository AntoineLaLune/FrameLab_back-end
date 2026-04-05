import db from "../database.js";

// GET
// export async function getAllChallenges(rend) {
// 	if (rend != true) {
// 		rend="";
// 	} else {
// 		" ORDER BY RAND() ";
// 	}
// 	return await db.getall("SELECT * FROM challenges"+rend);
// }

export async function getChallenge(id) {
	return await db.getrow(
		"SELECT * FROM challenges WHERE id = ?",
		[id]
	);
}
export async function getCurrentChallenge() {
	return await db.getrow("SELECT * FROM challenges WHERE (is_active)");
}
export async function getArchivesChallenges(is_active, limit, offset, rand) {
	const params = [];
	let is_active_stmt = "", rand_stmt = "", limit_stmt = "", offset_stmt = "";
	if (is_active) {
		is_active_stmt = "WHERE (is_active = 0)";
		params.push(is_active)
	}
	if (rand) {
		rand_stmt = "ORDER BY RAND()";
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
		`SELECT * FROM challenges ${is_active_stmt} ${rand_stmt} ${limit_stmt} ${offset_stmt}`,
		params
	);
}

// POST
export async function addChallenge(title, description, photo_url, start_date, end_date, creator_id,) {
	return await db.insert(
		"INSERT INTO challenges (title, description, photo_url, start_date, end_date, creator_id) VALUES (?, ?, ?, ?, ?, ?)",
		[title, description, photo_url, start_date, end_date, creator_id]
	);
}

// DEL
// @TODO
