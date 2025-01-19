
// lib/context.ts
import { getContext, setContext } from 'svelte';
import type { ChartContext } from './types.ts';

const CHART_CONTEXT_KEY = Symbol('chart');

export function setChartContext(context: ChartContext) {
	setContext(CHART_CONTEXT_KEY, context);
}

export function getChartContext(): ChartContext {
	return getContext(CHART_CONTEXT_KEY);
}
