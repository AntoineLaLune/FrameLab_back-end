import db from "../database.js";

// GET
// export async function getVote(id, user_id, participation_id) {
// 	const params = [];
// 	let where_stmt = "";

// 	if (id) {
// 		where_stmt = "WHERE id = ?";
// 		params.push(id)
// 	} else {
// 		if (user_id) {
// 			where_stmt = "WHERE user_id = ?";
// 			params.push(user_id)
// 			if (participation_id) {
// 				where_stmt = where_stmt + " AND participation_id = ?";
// 				params.push(participation_id)
// 			}
// 		} else if (participation_id) {
// 			where_stmt = "WHERE participation_id = ?";
// 			params.push(participation_id)
// 		}
// 	}

// 	return await db.getrow(
// 		`SELECT * FROM votes ${where_stmt}`,
// 		params
// 	);
// }

// POST
export async function addVote(creativity_note, technical_note, respect_theme_note, participation_id, user_id) {
	return await db.insert(
		"INSERT INTO votes (creativity_note, technical_note, respect_theme_note, participation_id, user_id) VALUES(?, ?, ?, ?, ?)",
		[creativity_note, technical_note, respect_theme_note, participation_id, user_id]
	);
}

// DEL
export async function removeVote(id) {
	return await db.insert(
		"DELETE FROM votes WHERE id = ?",
		[id]
	);
}
