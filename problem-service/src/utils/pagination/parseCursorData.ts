export interface ICursorData {
	search?: string;
	cursor?: string;
	direction?: "prev" | "next";
}

export function parseCursorData(query: ICursorData) {
	const search: string = query.search ? String(query.search) : "";
	const cursor: string = query.cursor ? String(query.cursor) : "";
	const direction =
		query.direction === "next" || query.direction === "prev"
			? query.direction
			: undefined;

	return {
		search,
		cursor,
		direction,
	};
}
