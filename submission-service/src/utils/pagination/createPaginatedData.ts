import { IPaginationOptions } from "./parsePagination.utils";

export interface IPaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface IPaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export function createPaginatedResponse<T>(
	data: T[],
	total: number,
	pagination: IPaginationOptions,
): IPaginatedResponse<T> {
	const { page, limit } = pagination;

	const totalPages = Math.ceil(total / limit);

	return {
		data,
		total,
		page,
		limit,
		totalPages,
		hasNextPage: page < totalPages,
		hasPreviousPage: page > 1,
	};
}
