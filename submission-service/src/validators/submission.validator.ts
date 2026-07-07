import { z } from "zod";
import {
	SubmissionLanguage,
	SubmissionStatus,
} from "@/models/submission.model";

export const createSubmissionSchema = z.object({
	problemId: z.string().min(1, "Problem ID is required"),

	code: z.string().min(1, "Code is required"),

	language: z.enum(SubmissionLanguage, {
		error: () => ({ message: "Invalid language" }),
	}),
});

export const updateSubmissionStatusSchema = z.object({
	status: z.enum(SubmissionStatus, {
		error: () => ({ message: "Invalid submission status" }),
	}),
});

export const findSubmissionByIdSchema = z.object({
	id: z.string().min(1, "Submission ID is required"),
});

export const findSubmissionsByProblemIdSchema = z.object({
	problemId: z.string().min(1, "Problem ID is required"),
});

// export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;
// export type UpdateSubmissionStatusDto = z.infer<
// 	typeof updateSubmissionStatusSchema
// >;
