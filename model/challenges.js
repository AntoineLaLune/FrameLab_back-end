// import db from "../database.js";

export async function getAllChallenges() {
  return await db.getall('SELECT * FROM challenges')
}

export async function getChallenge(id) {
  return await db.getrow('SELECT * FROM challenges WHERE id = ?', [id])
}
