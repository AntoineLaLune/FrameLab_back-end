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
export async function getArchivesChallenges(limit, offset, rand) {
	const params = [];
	let rand_stmt = "", limit_stmt = "", offset_stmt = "";
	if (rand) {
		rand_stmt = "ORDER BY RAND()";
	}
	if (limit) {
		limit_stmt = "LIMIT ?";
		params.push(parseInt(limit, 10));
	}
	if (offset) {
		offset_stmt = "OFFSET ?";
		params.push(parseInt(offset, 10));
	}
	return await db.getall(
		`SELECT * FROM challenges WHERE (is_active = 0) ${rand_stmt} ${limit_stmt} ${offset_stmt}`,
		params
	);
}

// POST
export async function addChallenge(title, description, image, start_date, end_date, creator_id) {
	return await db.insert(
		"INSERT INTO challenges (title, description, image, start_date, end_date, creator_id) VALUES (?, ?, ?, ?, ?, ?)",
		[title, description, image, start_date, end_date, creator_id]
	);
}

// DEL
export async function removeChallenge(id) {
	return await db.delete(
		"DELETE FROM challenges WHERE id = ?",
		[id]
	);
}
