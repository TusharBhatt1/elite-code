import { Model } from "mongoose";
import { IPaginationOptions } from "@/utils/pagination/parsePagination.utils";
import { createPaginatedResponse } from "@/utils/pagination/createPaginatedData";

export class BaseRepository<T> {
	constructor(protected readonly model: Model<T>) {}

	async paginate({
		filter = {},
		pagination,
		sort = { createdAt: -1 },
	}: {
		filter?: Record<any, any>;
		pagination: IPaginationOptions;
		sort?: Record<string, 1 | -1>;
	}) {
		const [data, total] = await Promise.all([
			this.model
				.find(filter)
				.sort(sort)
				.skip(pagination.skip)
				.limit(pagination.limit),

			this.model.countDocuments(filter),
		]);

		return createPaginatedResponse(data, total, pagination);
	}
}
