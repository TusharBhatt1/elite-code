import { redisConfig } from "@/config";
import { logger } from "@/config/logger.config";
import { redisClient } from "@/config/redis.config";
import { ISubmission } from "@/models/submission.model";
import { submissionQueue } from "@/queues/submission.queue";
import { IProblem } from "apis/problem.api";

export interface ISubmissionJob extends ISubmission {
	problem: IProblem;
}

export async function addSubmissionJob(
	submission: ISubmissionJob,
): Promise<string | null> {
	try {
		const job = await submissionQueue.add("evalute-submission", submission);
		logger.info(`Job added to submission queque: ${submission}`);

		return job.id || null;
	} catch (error) {
		logger.error(`Adding job to submission queue failed: ${error}`);
		return null;
	}
}

