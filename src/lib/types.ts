
export type Context<T> = {
	data: T[];
	width: number;
	height: number;
	margin: {
		top: number,
		bottom: number,
		left: number,
		right: number,
	};
	xKey: 'string';
	yKey: 'string';
}
