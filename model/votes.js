import db from "../database.js";

export async function getAllVotes() {
	return await db.getall('SELECT * FROM votes');
}

export async function getVote(id) {
	return await db.getrow('SELECT * FROM votes WHERE id = ?', [id]);
}

export async function addVote(creativity_note, technical_note, respect_theme_note, participation_id, user_id) {
	return await db.insert('INSERT INTO votes (creativity_note, technical_note, respect_theme_note, participation_id, user_id) VALUES(?, ?, ?, ?, ?)', [creativity_note], [technical_note], [respect_theme_note], [participation_id], [user_id]);
}

export async function removeVote(id) {
	return await db.insert('DELETE FROM votes WHERE id = ?', [id]);
}
