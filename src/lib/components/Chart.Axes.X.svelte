<!-- Chart.Axes.X.svelte -->
<script lang="ts">
	import type { ScaleType, ChartContext, D3Scale } from '../types.js';
	import { getContext } from 'svelte';
	import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
	import { axisBottom } from 'd3-axis';
	import { select } from 'd3-selection';

	let {
		scale = 'linear',
		label,
		domain,
		tickFormat,
		tickCount
	} = $props<{
		scale?: ScaleType;
		label?: string;
		domain?: [number, number] | [Date, Date] | string[];
		tickFormat?: (d: any) => string;
		tickCount?: number;
	}>();

	const getChartContext = getContext<() => ChartContext>('chart');
	let axisElement: SVGGElement;

	$effect(() => {
		if (!axisElement) return;

		const { data, dimensions, scales } = getChartContext();
		const { width, margin } = dimensions;

		// Create appropriate scale based on type
		scales.x = (
			scale === 'time' ? scaleTime() : scale === 'band' ? scaleBand().padding(0.1) : scaleLinear()
		) as D3Scale<typeof scale>;

		// Set range
		const range = [0, width - margin.left - margin.right];
		scales.x.range(range);

		// Set domain based on provided domain or data
		if (domain) {
			scales.x.domain(domain);
		} else {
			if (scale === 'band') {
				(scales.x as D3Scale<'band'>).domain(data.map((d) => d.x));
			} else {
				const extent = [Math.min(...data.map((d) => d.x)), Math.max(...data.map((d) => d.x))];
				scales.x.domain(extent);
			}
		}

		// Create axis
		const axis = axisBottom(scales.x);

		// Configure axis
		if (tickFormat) axis.tickFormat(tickFormat);
		if (tickCount) axis.ticks(tickCount);

		// Render axis
		select(axisElement).call(axis);
	});

	$effect(() => {
		const { dimensions } = getChartContext();
		if (axisElement && label) {
			select(axisElement)
				.select('.axis-label')
				.attr('x', (dimensions.width - dimensions.margin.left - dimensions.margin.right) / 2)
				.attr('y', 40);
		}
	});
</script>

<g
	bind:this={axisElement}
	class="x-axis"
	transform="translate(0,{getChartContext().dimensions.height -
		getChartContext().dimensions.margin.top -
		getChartContext().dimensions.margin.bottom})"
>
	{#if label}
		<text class="axis-label" text-anchor="middle" dominant-baseline="hanging">
			{label}
		</text>
	{/if}
</g>
