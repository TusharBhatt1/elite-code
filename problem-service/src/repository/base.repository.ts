//@ts-nocheck
import { Types, Model } from "mongoose";
import { ICursorData } from "@/utils/pagination/parseCursorData";


export interface ICursorPaginatedResponse<T> {
	data: T[];
	pageInfo: {
		hasNextPage: boolean;
		hasPrevPage: boolean;
		nextCursor: string | null;
		prevCursor: string | null;
	};
}

interface ICursorOptions extends ICursorData {
	filter: Record<any,any>;
}
export interface ICursorPaginatedResponse<T> {
	data: T[];
	pageInfo: {
		hasNextPage: boolean;
		hasPrevPage: boolean;
		nextCursor: string | null;
		prevCursor: string | null;
	};
}

export class BaseRepository<T> {
	constructor(protected readonly model: Model<T>) {}

	async cursorPaginate({
		cursor,
		direction = "next",
		search,
		limit = 10,
        filter
	}: ICursorOptions): Promise<ICursorPaginatedResponse<T>> {
	
		if (cursor) {
			filter._id =
				direction === "next"
					? { $lt: new Types.ObjectId(cursor) }
					: { $gt: new Types.ObjectId(cursor) };
		}

		const sort = direction === "next" ? { _id: -1 } : { _id: 1 };

		let documents = await this.model
			.find(filter)
			.sort(sort)
			.limit(limit + 1);

		const hasMore = documents.length > limit;

		if (hasMore) {
			documents.pop();
		}

		if (direction === "prev") {
			documents.reverse();
		}

		return {
			data: documents,
			pageInfo: {
				hasNextPage: direction === "next" ? hasMore : !!cursor,

				hasPrevPage: direction === "prev" ? hasMore : !!cursor,

				prevCursor: documents.length > 0 ? documents[0]._id.toString() : null,

				nextCursor:
					documents.length > 0
						? documents[documents.length - 1]._id.toString()
						: null,
			},
		};
	}
}
