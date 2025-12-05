// import db from "../database.js";

export async function getAllVotes() {
  return await db.getall('SELECT * FROM votes')
}

export async function getVote(id) {
  return await db.getrow('SELECT * FROM votes WHERE id = ?', [id])
}
