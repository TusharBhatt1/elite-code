import { Request, Response } from "express";
import { IProblemService } from "../services/problem.service";

export interface IProblemController {
	createProblem(req: Request, res: Response): Promise<void>;
	getProblemById(req: Request, res: Response): Promise<void>;
	getAllProblems(req: Request, res: Response): Promise<void>;
	updateProblem(req: Request, res: Response): Promise<void>;
	deleteProblem(req: Request, res: Response): Promise<void>;
	findByDifficulty(req: Request, res: Response): Promise<void>;
	searchProblems(req: Request, res: Response): Promise<void>;
}

export class ProblemController implements IProblemController {
	private problemService: IProblemService;

	constructor(problemService: IProblemService) {
		this.problemService = problemService;
	}

	async createProblem(req: Request, res: Response): Promise<void> {
		const problem = await this.problemService.createProblem(req.body);

		res.status(201).json({
			message: "Problem created successfully",
			data: problem,
		success: true,
		});
	}

	async getProblemById(req: Request, res: Response): Promise<void> {
		const problem = await this.problemService.getProblemById(
			req.params.id as string,
		);

		res.status(200).json({
			data: problem,
			success: true,
		});
	}

	async getAllProblems(req: Request, res: Response): Promise<void> {
		const result = await this.problemService.getAllProblems();

		res.status(200).json({
			data: result,
			success: true,
		});
	}

	async updateProblem(req: Request, res: Response): Promise<void> {
		const problem = await this.problemService.updateProblem(
			req.params.id as string,
			req.body,
		);

		res.status(200).json({
			message: "Problem updated successfully",
			data: problem,
			success: true,
		});
	}

	async deleteProblem(req: Request, res: Response): Promise<void> {
		await this.problemService.deleteProblem(req.params.id as string);

		res.status(200).json({
			message: "Problem deleted successfully",
			success: true,
		});
	}

	async findByDifficulty(req: Request, res: Response): Promise<void> {
		const problems = await this.problemService.findByDifficulty(
			req.params.difficulty as "easy" | "medium" | "hard",
		);

		res.status(200).json({
			data: problems,
			success: true,
		});
	}

	async searchProblems(req: Request, res: Response): Promise<void> {
		const problems = await this.problemService.searchProblems(
			req.query.q as string,
		);

		res.status(200).json({
			data: problems,
			success: true,
		});
	}
}
