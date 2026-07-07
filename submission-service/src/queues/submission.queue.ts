import { logger } from "@/config/logger.config";
import { createNewRedisConnection } from "@/config/redis.config";
import { Queue } from "bullmq";

export const submissionQueue = new Queue("submission", {
	//@ts-ignore
	connection: createNewRedisConnection(),
	defaultJobOptions: {
		attempts: 3,
		backoff: {
			type: "exponential",
			delay: 2000,
		},
	},
});

submissionQueue.on("error", (error) => {
	logger.error(`Submission queue errored: ${error}`);
});

submissionQueue.on("waiting", (job) => {
	logger.info(`Submission job waiting: ${job}`);
});

// export const submissionQuequeEvents = new QueueEvents("submission");

// submissionQuequeEvents.on("completed", ({ jobId }) => {
// 	logger.error(`Job ${jobId} completed`);
// });

// submissionQuequeEvents.on("failed", ({ jobId }, err) => {
// 	logger.error(`Job ${jobId} failed: ${err}`);
// });
