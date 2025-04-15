<script lang="ts">
	import { chartContext } from '$lib/context.js';
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';
	import { createScale } from '$lib/utils/infer-type.js';
	import { scaleBand, timeHour, timeHours, timeMonth, timeMonths } from 'd3';
	import { extent } from 'd3-array';

	interface Props {
		x: string;
		y: string;
		series?: string;
		color?: string;
		patternId?: string;
		patternAngle?: number;
		patternSpacing?: number;
		patternWidth?: number;
		patternOpacity?: number;
		barWidth?: number;
		chartId?: string;
		rest?: SVGRectElement;
	}

	let {
		x,
		y,
		series,
		barWidth = 30,
		color = '#69b3a2',
		patternId = 'diagonal-pattern',
		patternAngle = 50,
		patternSpacing = 5,
		patternWidth = 1,
		patternOpacity = 0.5,
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
					scale: xScale
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
	const uniquePatternId = `${patternId}-${Math.random().toString(36).substring(2, 9)}`;
</script>

<!-- Define the diagonal line pattern -->
<defs>
	<pattern
		id={uniquePatternId}
		patternUnits="userSpaceOnUse"
		width={patternSpacing}
		height={patternSpacing}
		patternTransform="rotate({patternAngle})"
	>
		<line
			x1="0"
			y1="0"
			x2="0"
			y2={patternSpacing}
			stroke={color}
			stroke-width={patternWidth}
			stroke-opacity={patternOpacity}
		/>
	</pattern>
</defs>

<g class="bar-series">
	{#if xType === 'categorical'}
		{#each bins as category, i}
			{@const yValue = renderData[i][y]}
			{@const barHeight = height - margin.bottom - yScale(yValue)}
			{@const yPos = yValue === 0 ? height - margin.bottom - 0 : yScale(yValue)}
			<rect
				x={xScale(category)}
				y={yPos}
				height={barHeight}
				width={xScale.bandwidth()}
				fill={`url(#${uniquePatternId})`}
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
