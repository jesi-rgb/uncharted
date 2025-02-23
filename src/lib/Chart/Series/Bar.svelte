<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';

	interface Props {
		color?: string;
	}

	const { xKey, xScaleWrapper } = xAxesContext.get();
	const { yKey, yScaleWrapper } = yAxesContext.get();
	const { height, margin, data } = chartContext.get();

	let { color = '#69b3a2' }: Props = $props();

	let xScale = $derived(xScaleWrapper());
	let yScale = $derived(yScaleWrapper());

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
