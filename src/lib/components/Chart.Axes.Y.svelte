<script lang="ts">
	import type { ScaleType, ChartContext, D3Scale } from '../types.js';
	import { getContext } from 'svelte';
	import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
	import { axisLeft } from 'd3-axis';
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
		const { height, margin } = dimensions;

		// Create appropriate scale based on type
		scales.y = (
			scale === 'time' ? scaleTime() : scale === 'band' ? scaleBand().padding(0.1) : scaleLinear()
		) as D3Scale<typeof scale>;

		// Set range (note the reverse for y-axis)
		const range = [height - margin.top - margin.bottom, 0];
		scales.y.range(range);

		// Set domain based on provided domain or data
		if (domain) {
			scales.y.domain(domain);
		} else {
			if (scale === 'band') {
				(scales.y as D3Scale<'band'>).domain(data.map((d) => d.y));
			} else {
				const extent = [Math.min(...data.map((d) => d.y)), Math.max(...data.map((d) => d.y))];
				scales.y.domain(extent);
			}
		}

		// Create axis
		const axis = axisLeft(scales.y);

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
				.attr('x', -((dimensions.height - dimensions.margin.top - dimensions.margin.bottom) / 2))
				.attr('y', -40);
		}
	});
</script>

<g bind:this={axisElement} class="y-axis">
	{#if label}
		<text class="axis-label" text-anchor="middle" transform="rotate(-90)">
			{label}
		</text>
	{/if}
</g>
