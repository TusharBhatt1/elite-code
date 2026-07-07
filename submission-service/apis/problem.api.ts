import axios from "axios";
import { crossServiceConfig } from "../../problem-service/src/config";
export interface ITestCase {
	input: string;
	output: string;
}
export interface IProblem {
	title: string;
	description: string;
	difficulty: "easy" | "medium" | "hard";
	testCases: ITestCase[];
	editorial?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProblemResponse {
	data: IProblem;
	message: string;
	success: boolean;
}
export async function getProblemById(
	problemId: string,
): Promise<IProblemResponse | null> {
	try {
		const response = await axios.get<IProblemResponse>(
			`${crossServiceConfig.PROBLEM_SERVICE}/problem/${problemId}`,
		);

		return response.data;
	} catch (error) {
		return null;
	}
}
