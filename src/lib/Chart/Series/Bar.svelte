<script lang="ts">
	import { chartContext } from '$lib/context.js';
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';
	import { createScale } from '$lib/utils/infer-type.js';
	import { timeHour } from 'd3';

	interface Props {
		x: string;
		y: string;
		series?: string;
		color?: string;
		fillOpacity?: number;
		barWidth?: number; // from 0 to 1
		fill?: string;
		innerGap?: number;
		chartId?: string;
		rest?: SVGRectElement;
	}

	let {
		x,
		y,
		series,
		barWidth = 30,
		color = '#69b3a2',
		fillOpacity = 0.5,
		fill = '#69b3a2',
		innerGap: barInnerWidth = 0,
		...rest
	}: Props = $props();

	const id = chartContext.get();

	const { width, height, margin, data } = $derived($chartStore[id]);

	let renderData = $derived.by(() => {
		if (series) {
			return data[series];
		} else {
			return data;
		}
	});

	let { scale: xScale, type: xType } = $derived(
		createScale(renderData, x, [margin.left, width! - margin.right])
	);

	function getTickWidth(scale, interval) {
		const start = scale.domain()[0];
		const next = interval.offset(start, 1); // Get next tick using d3 time interval
		return Math.abs(scale(next) - scale(start));
	}

	const tickWidth = $derived(getTickWidth(xScale, timeHour));

	let { scale: yScale, type: yType } = $derived(
		createScale(renderData, y, [height - margin.bottom, margin.top])
	);

	let xScaleFlavoured = $derived(xScale.copy().padding(barInnerWidth));

	let bins = $derived.by(() => {
		if (xType === 'categorical') {
			return renderData.map((d) => d[x]);
		} else {
			return xScale.ticks();
		}
	});

	// Update the store whenever the scale or its dependencies change
	$effect(() => {
		xAxesStore.update((store) => {
			return {
				...store,
				[id]: {
					key: x,
					type: xType,
					scale: xScaleFlavoured
				}
			};
		});

		yAxesStore.update((store) => {
			return {
				...store,
				[id]: {
					key: y,
					type: yType,
					scale: yScale
				}
			};
		});
	});

	// Generate a unique ID for this instance's pattern
</script>

<!-- Define the diagonal line pattern -->

<g class="bar-series">
	{#if xType === 'categorical'}
		{#each bins as category, i}
			{@const yValue = renderData[i][y]}
			{@const barHeight = height - margin.bottom - yScale(yValue)}
			{@const yPos = yValue === 0 ? height - margin.bottom - 0 : yScale(yValue)}
			<rect
				x={xScaleFlavoured(category)}
				y={yPos}
				height={barHeight}
				width={xScaleFlavoured.bandwidth()}
				{fill}
				fill-opacity={fillOpacity}
				stroke={color}
				stroke-width="0.9"
				{...rest}
			/>
		{/each}
	{:else if xType === 'time'}
		{#each renderData as dataPoint}
			{@const dataDate = new Date(dataPoint[x])}
			{@const yValue = dataPoint[y]}
			{@const barHeight = height - margin.bottom - yScale(yValue)}

			<rect
				x={xScale(dataDate)}
				y={yScale(yValue)}
				height={barHeight}
				width={tickWidth}
				fill={`url(#${uniquePatternId})`}
				stroke={color}
				stroke-width="0.9"
				{...rest}
			/>
		{/each}
	{/if}
</g>
