// import db from "../database.js";

export async function getAllParticipations() {
  return await db.getall('SELECT * FROM participations')
}

export async function getParticipation(id) {
  return await db.getrow('SELECT * FROM participations WHERE id = ?', [id])
}
