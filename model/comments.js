import db from "../database.js";

export async function getAllComments() {
	return await db.getall('SELECT * FROM comments');
}

export async function getComment(id) {
	return await db.getrow('SELECT * FROM comments WHERE id = ?', [id]);
}

export async function addComment(content, user_id, participation_id) {
	return await db.insert('INSERT INTO comments (content, user_id, participation_id) VALUES (?, ?, ?)', [content, user_id, participation_id]);
}

export async function removeComment(id) {
	return await db.delete('DELETE FROM comments WHERE id = ?', [id]);
}
