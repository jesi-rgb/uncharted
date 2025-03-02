
export type ChartContext<T> = {
	data: T[];
	width: number;
	height: number;
	margin: {
		top: number,
		bottom: number,
		left: number,
		right: number,
	};
	id: string;
}
