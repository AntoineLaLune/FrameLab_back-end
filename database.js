import Database from "mysql2-async";

const db = new Database({
		host: process.env.DB_ADRESSE,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		skiptzfix: true,
		dateStrings: true,
});

export default db