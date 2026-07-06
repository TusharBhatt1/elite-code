import express from "express";
import { ProblemController } from "../../controllers/problem.controller";
import { ProblemService } from "../../services/problem.service";
import { ProblemRepository } from "../../repository/problem.repository";
import {
	validateRequestBody,
	validateRequestParams,
} from "../../middlewares/validateRequestbody.middleware";
import {
	createProblemDTOSchema,
	findByDifficultySchema,
	updatedProblemDTOSchema,
} from "../../validator/problem.validator";

export const problemRouter = express.Router();

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
const problemController = new ProblemController(problemService);

problemRouter.post(
	"/create",
	validateRequestBody(createProblemDTOSchema),
	problemController.createProblem,
);

problemRouter.get("/", problemController.getAllProblems);

problemRouter.get("/search", problemController.searchProblems);

problemRouter.get(
	"/difficulty/:difficulty",
	validateRequestParams(findByDifficultySchema),
	problemController.findByDifficulty,
);

problemRouter.get("/:id", problemController.getProblemById);

problemRouter.patch(
	"/:id",
	validateRequestBody(updatedProblemDTOSchema),
	problemController.updateProblem,
);

problemRouter.delete("/:id", problemController.deleteProblem);
