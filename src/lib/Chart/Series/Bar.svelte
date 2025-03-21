<script lang="ts">
	import { chartContext } from '$lib/context.js';
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';
	import { createScale } from '$lib/utils/infer-type.js';

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

	$inspect(renderData, xType);

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
			<rect
				x={xScale(category)}
				y={yScale(renderData[i][y])}
				height={height - margin.bottom - yScale(renderData[i][y])}
				width={xScale.bandwidth()}
				fill={`url(#${uniquePatternId})`}
				stroke={color}
				stroke-width="0.9"
				{...rest}
			/>
		{/each}
	{:else if xType === 'time'}
		{#each bins as category, i}
			<rect
				x={xScale(category) - barWidth / 2}
				y={yScale(renderData[i][y])}
				height={height - margin.bottom - yScale(renderData[i][y])}
				width={barWidth}
				fill={`url(#${uniquePatternId})`}
				stroke={color}
				stroke-width="0.9"
				{...rest}
			/>
		{/each}
	{/if}
</g>
