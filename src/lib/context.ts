import { Context } from "runed"
import type { ScaleBand, ScaleLinear } from "d3"
import { type ChartContext, type Scale, type ScaleType } from "./types.js"


export const CHART_CONTEXT = 'uncharted-context'
export const X_AXES_CONTEXT = 'x-axes-context'
export const Y_AXES_CONTEXT = 'y-axes-context'


export const chartContext = new Context(CHART_CONTEXT)

//export function createChartContext<T extends Record<string, any>>() {
//	return new Context<ChartContext<T>>(CHART_CONTEXT);
//}

export const xAxesContext = new Context<{ xKey: string, xType: ScaleType, xScale: Scale<'categorical'> }>(X_AXES_CONTEXT)
export const yAxesContext = new Context<{ yKey: string, yType: ScaleType, yScale: Scale<'number'> }>(Y_AXES_CONTEXT)
