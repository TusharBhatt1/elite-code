import "dotenv/config";

export const dbConfig = {
	PORT: process.env.PORT,
	DB_URL: process.env.DB_URL || 3001,
};

export const redisConfig= {
	HOST:process.env.REDIS_HOST,
	PORT:process.env.REDIS_PORT
}
