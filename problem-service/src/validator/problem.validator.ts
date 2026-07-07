import z, { ZodType } from "zod";
import { ITestCase } from "../models/problem.model";
import mongoose from "mongoose";

const testCaseDTOSchema: ZodType<ITestCase> = z.object({
	input: z.string(),
	output: z.string(),
});

const createProblemDTOSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	difficulty: z.enum(["easy", "medium", "hard"]),
	testCases: z
		.array(testCaseDTOSchema)
		.min(1, "At least one test case is required"),
	editorial: z.string().optional(),
});

const findByIdSchema = z.object({
	id: z.string().refine(
	  (id) => mongoose.Types.ObjectId.isValid(id),
	  {
		message: "Invalid MongoDB ObjectId",
	  }
	),
  });

const findByDifficultySchema = z.object({
	difficulty: z.enum(["easy", "medium", "hard"]),
});

const updatedProblemDTOSchema = createProblemDTOSchema.partial();

export type ICreateProblemDTO = z.infer<typeof createProblemDTOSchema>;
export type IUpdateProblemDTO = z.infer<typeof updatedProblemDTOSchema>;

export {
	createProblemDTOSchema,
	updatedProblemDTOSchema,
	findByDifficultySchema,
	findByIdSchema
};
