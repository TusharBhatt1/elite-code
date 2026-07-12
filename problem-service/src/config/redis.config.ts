import Redis from "ioredis";
import { logger } from "./logger.config";

const redisClient = new Redis({
	port: Number(process.env.REDIS_PORT!),
	host: process.env.REDIS_HOST!,
});

redisClient.on("connect", () => {
	logger.info("Connected to Redis...");
});
redisClient.on("error", () => {
	logger.info("Error connecting to Redis...");
});

export { redisClient };
