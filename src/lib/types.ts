import type { ScaleLinear, ScaleTime, ScaleBand } from 'd3-scale';

export type ChartData = Record<string, any>[];

export type Dimensions = {
	width: number;
	height: number;
	margin: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
};

export type ScaleType = 'linear' | 'time' | 'band';

export type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type D3Scale<T> =
	T extends 'linear' ? ScaleLinear<number, number> :
	T extends 'time' ? ScaleTime<number, number> :
	T extends 'band' ? ScaleBand<string> :
	never;

export type ChartScales = {
	x: D3Scale<ScaleType>;
	y: D3Scale<ScaleType>;
};

export interface ChartContext {
	data: ChartData;
	scales: ChartScales;
	dimensions: Dimensions;
}
