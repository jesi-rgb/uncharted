<script lang="ts">
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';

	interface Props {
		color?: string;
		patternId?: string;
		patternAngle?: number;
		patternSpacing?: number;
		patternWidth?: number;
		patternOpacity?: number;
		rest?: SVGRectElement;
	}

	const { height, margin, data } = $derived($chartStore);

	const { xKey, xType, xScale } = $derived($xAxesStore);
	const { yKey, yScale } = $derived($yAxesStore);

	let {
		color = '#69b3a2',
		patternId = 'diagonal-pattern',
		patternAngle = 50,
		patternSpacing = 5,
		patternWidth = 1,
		patternOpacity = 0.5,
		...rest
	}: Props = $props();

	let bins = $state([]);
	$effect(() => {
		if (xType === 'categorical') {
			bins = data.map((d) => d[xKey]);
		} else if (xType === 'date') {
			console.log(xScale.ticks());
			bins = xScale.ticks();
		}
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

{#if xType === 'categorical'}
	<g class="bar-series">
		{#each bins as category, i}
			<rect
				x={xScale(category)}
				y={yScale(data[i][yKey])}
				height={height - margin.bottom - yScale(data[i][yKey])}
				width={xScale.bandwidth()}
				fill={`url(#${uniquePatternId})`}
				stroke={color}
				stroke-width="0.9"
				{...rest}
			/>
		{/each}
	</g>
{:else if xType === 'date'}
	<g class="bar-series">
		{#each bins as category, i}
			<rect
				x={xScale(category)}
				y={yScale(data[i][yKey])}
				height={height - margin.bottom - yScale(data[i][yKey])}
				width={30}
				fill={`url(#${uniquePatternId})`}
				stroke={color}
				stroke-width="0.9"
				{...rest}
			/>
		{/each}
	</g>
{/if}
