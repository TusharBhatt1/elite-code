import express from "express";
import { validateRequestBody } from "@/middlewares/submission.middleware";
import { createSubmissionSchema } from "@/validators/submission.validator";
import { SubmissionController } from "@/controllers/submission.controller";

export const submissionRouter = express.Router();

submissionRouter.post(
	"/submit",
	validateRequestBody(createSubmissionSchema),
	SubmissionController.createSubmission,
);
