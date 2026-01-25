import db from "../database.js";

export async function getAllChallenges() {
	return await db.getall('SELECT * FROM challenges');
}

export async function getChallengeById(id) {
	return await db.getrow('SELECT * FROM challenges WHERE id = ?', [id]);
}

export async function getLastChallenge() {	
	return await db.getrow('SELECT * FROM challenges WHERE (is_active)');
}

export async function getArchiveChallenge() {	
	return await db.getrow('SELECT * FROM challenges WHERE (is_active = 0)');
}

export async function addChallenge(title, description, photo_url, start_date, end_date, creator_id) {
	return await db.insert('INSERT INTO challenges (title, description, photo_url, start_date, end_date, creator_id) VALUES (?, ?, ?, ?, ?, ?)', [title, description, photo_url, start_date, end_date, creator_id]);
}
