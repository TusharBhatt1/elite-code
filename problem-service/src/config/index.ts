import "dotenv/config";

export const dbConfig = {
	PORT: process.env.PORT,
	DB_URL: process.env.DB_URL || 3001,
};

export const crossServiceConfig={
	PROBLEM_SERVICE:process.env.PROBLEM_SERVICE
}