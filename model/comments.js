// import db from "../database.js";

export async function getAllComments() {
  return await db.getall('SELECT * FROM comments')
}

export async function getComment(id) {
  return await db.getrow('SELECT * FROM comments WHERE id = ?', [id])
}