import { Context } from "runed"
import type { ScaleBand, ScaleLinear } from "d3"


export const CHART_CONTEXT = 'uncharted-context'
export const X_AXES_CONTEXT = 'x-axes-context'
export const Y_AXES_CONTEXT = 'y-axes-context'


export const chartContext = new Context(CHART_CONTEXT)
export const xAxesContext = new Context<{ xKey: string, xScale: () => ScaleBand }>(X_AXES_CONTEXT)
export const yAxesContext = new Context<{ yKey: string, yScale: () => ScaleLinear }>(Y_AXES_CONTEXT)
