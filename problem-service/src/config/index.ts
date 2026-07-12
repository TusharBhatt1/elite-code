import "dotenv/config";

export const dbConfig = {
	DB_URL: process.env.DB_URL || 3001,
};
