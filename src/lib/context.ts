import { Context } from "runed"
import { type ChartContext } from "./types.js"
import type { ScaleLinear } from "d3"


export const CHART_CONTEXT = 'uncharted-context'
export const X_AXES_CONTEXT = 'x-axes-context'
export const Y_AXES_CONTEXT = 'y-axes-context'

export const chartContext = new Context(CHART_CONTEXT)
export const xAxesContext = new Context<{ xKey: string, xScale: () => ScaleLinear<number, number> }>(X_AXES_CONTEXT)
export const yAxesContext = new Context<{ yKey: string, yScale: () => ScaleLinear<number, number> }>(Y_AXES_CONTEXT)
