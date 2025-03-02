<script lang="ts">
	import { yAxesContext, xAxesContext, chartContext } from '$lib/context.js';
	import { getContext } from 'svelte';

	// Get scales from context
	const { yKey, yScale } = $derived(yAxesContext.get());
	const { xKey, xScale } = $derived(xAxesContext.get());
	const { margin, width, height } = $derived(chartContext.get());

	interface Props {
		axis?: 'horizontal' | 'vertical' | 'both';
		stroke?: string;
		strokeWidth?: number;
		strokeDashArray?: string;
		opacity?: number;
	}

	const {
		axis = 'both',
		stroke = '#ccc',
		strokeWidth = 1,
		strokeDashArray = '3 5',
		opacity = 0.2
	}: Props = $props();

	let xTicks = $derived(xScale.domain());
	let yTicks = $derived(yScale.ticks ? yScale.ticks() : []);

	let showXGrid = $derived(axis === 'horizontal' || axis === 'both');
	let showYGrid = $derived(axis === 'vertical' || axis === 'both');
</script>

<g class="horizontal-lines" aria-hidden="true">
	{#if showXGrid}
		{#each yTicks as yT}
			<line
				x1={margin.left}
				x2={width - margin.right}
				y1={yScale(yT)}
				y2={yScale(yT)}
				class="grid-line"
				{stroke}
				stroke-width={strokeWidth}
				stroke-dasharray={strokeDashArray}
				{opacity}
			/>
		{/each}
	{/if}
</g>

<g class="vertical-lines" aria-hidden="true">
	{#if showYGrid}
		{#each xTicks as xT}
			<line
				x1={xScale(xT) + xScale.bandwidth() / 2}
				x2={xScale(xT) + xScale.bandwidth() / 2}
				y1={margin.top}
				y2={height - margin.bottom}
				class="grid-line"
				{stroke}
				stroke-width={strokeWidth}
				stroke-dasharray={strokeDashArray}
				{opacity}
			/>
		{/each}
	{/if}
</g>

<style>
	.grid-line {
		vector-effect: non-scaling-stroke;
		shape-rendering: crispEdges;
	}
</style>
