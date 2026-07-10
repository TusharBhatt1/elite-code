import {
	ISubmission,
	ISubmissionResult,
	SubmissionModel,
	SubmissionStatus,
} from "@/models/submission.model";
import { IPagination } from "@/utils/pagination/parsePagination.utils";

export interface ISubmissionRepository {
	create(submission: ISubmission): Promise<ISubmission>;
	findById(id: string): Promise<ISubmission | null>;
	deleteById(id: string): Promise<boolean | null>;
	updateStatus(
		id: string,
		status: SubmissionStatus,
	): Promise<ISubmission | null>;
	addResult(
		id: string,
		status: SubmissionStatus,
		result: ISubmissionResult,
	): Promise<ISubmission | null>;
	findByProblemId(
		problemId: string,
		pagination: IPagination,
		search: string,
	): Promise<ISubmission[]>;
}

export class SubmissionRepository implements ISubmissionRepository {
	async create(submission: ISubmission): Promise<ISubmission> {
		return await SubmissionModel.create(submission);
	}
	async findById(id: string): Promise<ISubmission | null> {
		return await SubmissionModel.findById(id);
	}
	async findByProblemId(
		problemId: string,
		pagination: IPagination,
		search: string,
	): Promise<ISubmission[]> {
		return await SubmissionModel.find({
			problemId,
		});
	}
	async updateStatus(
		id: string,
		status: SubmissionStatus,
	): Promise<ISubmission | null> {
		return await SubmissionModel.findByIdAndUpdate(id, {
			status,
		});
	}
	async addResult(
		id: string,
		status: SubmissionStatus,
		result: ISubmissionResult,
	): Promise<ISubmission | null> {
		return await SubmissionModel.findOneAndUpdate(
			{
				_id: id,
				result: { $exists: false },
			},
			{
				$set: { result, status },
			},
			{
				new: true,
			},
		);
	}
	async deleteById(id: string): Promise<boolean | null> {
		return await SubmissionModel.findByIdAndDelete(id);
	}
}
