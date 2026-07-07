import { ISubmission, SubmissionStatus } from "@/models/submission.model";
import { ISubmissionRepository } from "@/repositories/submission.repository";

export interface ISubmissionService {
  createSubmission(submission: ISubmission): Promise<ISubmission>;

  findSubmissionById(id: string): Promise<ISubmission | null>;

  findSubmissionsByProblemId(problemId: string): Promise<ISubmission[]>;

  updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
  ): Promise<ISubmission | null>;

  deleteSubmissionById(id: string): Promise<boolean>;
}

export class SubmissionService implements ISubmissionService {
    constructor(
      private readonly submissionRepository: ISubmissionRepository,
    ) {}
  
    async createSubmission(submission: ISubmission): Promise<ISubmission> {
      // TODO: Add payload to BullMQ and call the Problem Service
         // get the problem => save the payload to DB => add submission to bull queue

      return this.submissionRepository.create(submission);
    }
  
    async findSubmissionById(id: string): Promise<ISubmission | null> {
      return this.submissionRepository.findById(id);
    }
  
    async findSubmissionsByProblemId(
      problemId: string,
    ): Promise<ISubmission[]> {
      return this.submissionRepository.findByProblemId(problemId);
    }
  
    async updateSubmissionStatus(
      id: string,
      status: SubmissionStatus,
    ): Promise<ISubmission | null> {
      return this.submissionRepository.updateStatus(id, status);
    }
  
    async deleteSubmissionById(id: string): Promise<boolean> {
      const deleted = await this.submissionRepository.deleteById(id);
  
      if (!deleted) {
        throw new Error("Submission not found");
      }
  
      return deleted;
    }
  }