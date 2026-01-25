import e from "express";
import db from "../database.js";

export async function getAllParticipations() {
	return await db.getall('SELECT * FROM participations');
}

export async function getParticipation(id) {
	return await db.getrow('SELECT * FROM participations WHERE id = ?', [id]);
}

export async function addParticipation(photo_url, project_name, user_id) {
	return await db.insert('INSERT INTO participations (photo_url, project_name, user_id) VALUES (?, ?, ?)', [photo_url, project_name, user_id]);
}

export async function removeParticipation(id) {
	return await db.delete('DELETE FROM participations WHERE id = ?', [id]);
}
