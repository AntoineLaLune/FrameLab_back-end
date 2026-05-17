import Database from "mysql2-async";

const db = new Database({
	host: Deno.env.get("DB_ADRESSE"),
	port: Deno.env.get("DB_PORT"),
	user: Deno.env.get("DB_USER"),
	password: Deno.env.get("DB_PASSWORD"),
	database: Deno.env.get("DB_NAME"),
	skiptzfix: true,
	dateStrings: true,
});

export default db
