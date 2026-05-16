import db from "../database.js";

// GET
export async function getUser(id) {
	return await db.getrow("SELECT id, email, last_name, first_name, is_admin, inscription_date FROM users WHERE id = ?", [parseInt(id, 10)]);
}
export async function getUserByEmail(email) {
	return await db.getrow(
		"SELECT id, email, last_name, first_name, is_admin, inscription_date FROM users WHERE email = ?",
		[email]
	);
}
export async function getUserPasswordByEmail(email) {
	return await db.getrow(
		"SELECT password FROM users WHERE email = ?",
		[email]
	);
}

// PUT
export async function updateUser(email, last_name, first_name, oldEmail) {
	return await db.insert(
		"UPDATE users SET email=?, last_name=?, first_name=? WHERE email=?",
		[email, last_name, first_name, oldEmail]
	);
}
export async function uptadeUserWithPassword(email, last_name, first_name, password, oldEmail,) {
	return await db.insert(
		"UPDATE users SET email=?, last_name=?, first_name=?, password=? WHERE email=?",
		[email, last_name, first_name, password, oldEmail]
	);
}

// DEL
export async function removeUser(id) {
	return await db.delete(
		"DELETE FROM comments WHERE id = ?",
		[id]
	);
}
