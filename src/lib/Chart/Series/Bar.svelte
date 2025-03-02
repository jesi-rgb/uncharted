<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';
	import type { ChartContext } from '$lib/types.js';

	interface Props {
		color?: string;
		patternId?: string;
		patternAngle?: number;
		patternSpacing?: number;
		patternWidth?: number;
		patternOpacity?: number;
		rest?: SVGRectElement;
	}

	const { height, margin, data } = $derived(chartContext.get());

	const { xKey, xScale } = $derived(xAxesContext.get());
	const { yKey, yScale } = $derived(yAxesContext.get());

	let {
		color = '#69b3a2',
		patternId = 'diagonal-pattern',
		patternAngle = 50,
		patternSpacing = 5,
		patternWidth = 1,
		patternOpacity = 0.5,
		...rest
	}: Props = $props();

	let categories = $derived(data.map((d) => d[xKey]));

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
	{#each categories as category, i}
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
