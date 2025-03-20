import type { ScaleLinear, ScaleTime, ScaleBand, ScaleLogarithmic } from "d3";
import type { Snippet } from "svelte";

export type DataPoint = Record<string, any>;

export type DataType = 'number' | 'time' | 'text' | 'categorical' | 'logarithmic';

export type Scale<T> =
	T extends 'number' ? ScaleLinear<number, number> :
	T extends 'logarithmic' ? ScaleLogarithmic<number, number> :
	T extends 'time' ? ScaleTime<number, number> :
	T extends 'categorical' | 'text' ? ScaleBand<string> :
	never;

export type ChartScales = {
	x: Scale<DataType>;
	y: Scale<DataType>;
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

export type YAxisProps = AxisProps & {
	right?: boolean;
}

export type SeriesProps = {
	color: string;
}
