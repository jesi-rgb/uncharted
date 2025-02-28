<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';

	interface Props {
		color?: string;
	}

	const { height, margin, data } = $derived(chartContext.get());

	let { color = '#69b3a2' }: Props = $props();

	const { xKey, xScale } = $derived(xAxesContext.get());
	const { yKey, yScale } = $derived(yAxesContext.get());

	let categories = $derived(data.map((d) => d[xKey]));
</script>

<g id="rects">
	{#each categories as category, i}
		<rect
			x={xScale(category)}
			y={yScale(data[i][yKey])}
			height={height - margin.bottom - yScale(data[i][yKey])}
			width={xScale.bandwidth()}
			fill={color}
		/>
	{/each}
</g>
