export type DataPoint = Record<string, any>;

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

export type AxisProps = {
	label?: string;
	orientation?: 'horizontal' | 'vertical';
	maxTicks?: number;
	labelOffset?: number;
	tickOffset?: number;
	tickSize?: number;
	tickPadding?: number;
	tickFormat?: (value: any) => string;
}

export type SeriesProps = {
	color: string;
}
