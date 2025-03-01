<script lang="ts">
	import { yAxesContext, xAxesContext, chartContext } from '$lib/context.js';
	import { getContext } from 'svelte';

	// Get scales from context
	const { yKey, yScale } = $derived(yAxesContext.get());
	const { xKey, xScale } = $derived(xAxesContext.get());
	const { margin, width } = $derived(chartContext.get());

	interface Props {
		axis?: 'x' | 'y' | 'both';
		stroke?: string;
		strokeWidth?: number;
		strokeDashArray?: string;
		opacity?: number;
	}
	const {
		axis,
		stroke = 'gray',
		strokeWidth = 1,
		strokeDashArray = '0 3 0',
		opacity = 0.5
	}: Props = $props();
	// Generate tick values based on scales
	let xTicks = $derived(xScale.ticks ? xScale.ticks() : []);
	let yTicks = $derived(yScale.ticks ? yScale.ticks() : []);

	$inspect(yTicks);

	// Determine if we should show x and/or y grid lines
	let showXGrid = $derived(axis === 'x' || axis === 'both');
	let showYGrid = $derived(axis === 'y' || axis === 'both');
</script>

<g class="grid-lines" aria-hidden="true">
	{#each yTicks as yT}
		<line
			x1={margin.left}
			y1={yScale(yT)}
			x2={width - margin.right}
			y2={yScale(yT)}
			class="grid-line"
			{stroke}
			stroke-width={strokeWidth}
			stroke-dasharray={strokeDashArray}
			{opacity}
		/>
	{/each}
</g>

<style>
	.grid-line {
		vector-effect: non-scaling-stroke;
		shape-rendering: crispEdges;
	}
</style>
