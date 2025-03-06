import type { ScaleLinear, ScaleTime, ScaleBand } from "d3";
import type { Snippet } from "svelte";

export type DataPoint = Record<string, any>;

export type ScaleType = 'linear' | 'time' | 'band';

export type Scale<T> =
	T extends 'linear' ? ScaleLinear<number, number> :
	T extends 'time' ? ScaleTime<number, number> :
	T extends 'band' ? ScaleBand<string> :
	never;

export type ChartScales = {
	x: Scale<ScaleType>;
	y: Scale<ScaleType>;
};

export type ChartContext<T extends Record<string, any>> = {
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

export type RootProps<T extends Record<string, any>> = {
	data: T[];
	width?: number;
	height?: number;
	margin?: {
		top?: number,
		bottom?: number,
		left?: number,
		right?: number,
	};
	children: Snippet;
	[key: string]: any; // For additional SVG attributes
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
