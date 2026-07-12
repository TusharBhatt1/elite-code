import { ICreateProblemDTO } from "../validator/problem.validator";
import { IProblem } from "../models/problem.model";
import { IProblemRepository } from "../repository/problem.repository";
import { getSanitizedMarkDown } from "../utils/helpers";
import { ICursorData } from "@/utils/pagination/parseCursorData";
import { ICursorPaginatedResponse } from "@/repository/base.repository";

export interface IProblemService {
	createProblem(problem: ICreateProblemDTO): Promise<IProblem>;
	getProblemById(id: string): Promise<IProblem | null>;
	getAllProblems(
		data: ICursorData,
	): Promise<ICursorPaginatedResponse<IProblem>>;
	updateProblem(id: string, problem: IProblem): Promise<IProblem | null>;
	deleteProblem(id: string): Promise<boolean>;
	findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]>;
	searchProblems(query: string): Promise<IProblem[]>;
}

export class ProblemService implements IProblemService {
	private problemRepository: IProblemRepository;

	constructor(problemRepository: IProblemRepository) {
		this.problemRepository = problemRepository;
	}

	async createProblem(problem: ICreateProblemDTO): Promise<IProblem> {
		const { description, editorial } = problem;

		const sanitizedDescription = await getSanitizedMarkDown(description);

		const sanitizedEditorial = editorial
			? await getSanitizedMarkDown(editorial)
			: undefined;

		return await this.problemRepository.createProblem({
			...problem,
			description: sanitizedDescription,
			...(editorial && { editorial: sanitizedEditorial }),
		});
	}
	async getProblemById(id: string): Promise<IProblem | null> {
		const p = await this.problemRepository.getProblemById(id);
		if (!p) {
			return null;
		}

		return p;
	}

	async getAllProblems(
		data: ICursorData,
	): Promise<ICursorPaginatedResponse<IProblem>> {
		return await this.problemRepository.getAllProblems(data);
	}

	async updateProblem(id: string, problem: IProblem): Promise<IProblem | null> {
		const p = await this.problemRepository.getProblemById(id);

		if (!p) {
			throw new Error("Problem not found");
		}

		const { description, editorial } = problem;

		let sanitizedDescription;
		let sanitizedEditorial;

		if (description) {
			sanitizedDescription = await getSanitizedMarkDown(description);
		}

		if (editorial) {
			sanitizedEditorial = await getSanitizedMarkDown(editorial);
		}

		return await this.problemRepository.updateProblem(id, {
			...problem,
			...(description && { description: sanitizedDescription }),
			...(editorial && { editorial: sanitizedEditorial }),
		});
	}

	async deleteProblem(id: string): Promise<boolean> {
		return this.problemRepository.deleteProblem(id);
	}

	async findByDifficulty(
		difficulty: "easy" | "medium" | "hard",
	): Promise<IProblem[]> {
		return this.problemRepository.findByDifficulty(difficulty);
	}
	async searchProblems(query: string): Promise<IProblem[]> {
		return this.problemRepository.searchProblems(query);
	}
}
