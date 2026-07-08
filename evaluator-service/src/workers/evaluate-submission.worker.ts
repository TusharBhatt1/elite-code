import { Worker } from "bullmq";
import { logger } from "@/config/logger.config";
import { createNewRedisConnection } from "@/config/redis.config";
import { createDockerContainer } from "@/docker/utils/createContainer.util";
import { JAVASCRIPT_IMAGE } from "@/docker/constants";

async function setupEvaluationWorker() {
	const worker = new Worker(
		"submission",
		async (job) => {
			logger.info(`Proccessing job ${job.id}`);
			const { id: submissionId, problem, code, language } = job.data;
			const container = await createDockerContainer({
				imageName: JAVASCRIPT_IMAGE,
			});

			await container?.start();
			const exec = await container?.exec({
				Cmd: ["node", "-e", code],
				AttachStdin:true,
				AttachStdout: true,
				AttachStderr: true,
			});

			const stream = await exec?.start({});

			container?.modem.demuxStream(stream, process.stdout, process.stderr);
		},

		{
			//@ts-ignore
			connection: createNewRedisConnection(),
		},
	);

	worker.on("ready", () => logger.info("Evaluation Worker is ready"));
}

async function startEvaluationWorkers() {
	await setupEvaluationWorker();
}

export { startEvaluationWorkers };
