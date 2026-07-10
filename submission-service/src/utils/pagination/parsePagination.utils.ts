export interface IPaginationOptions{
    page:number;
    limit:number;
    skip:number
}
export function parsePagination(query: { page?: string; limit?: string }) {
	const page = Math.max(Number(query.page) || 1, 1);

	const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

	return {
		page,
		limit,
		skip: (page - 1) * limit,
	};
}
