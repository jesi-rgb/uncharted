<script lang="ts">
	import { CHART_CONTEXT, X_AXES_CONTEXT, Y_AXES_CONTEXT } from '$lib/context.js';
	import type { Context } from '$lib/types.js';
	import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3';
	import { getAllContexts, getContext } from 'svelte';

	interface Props<T extends { [key: string]: any }> {
		data: T[];
		xKey: keyof T;
		yKey: keyof T;
		xScale: ScaleLinear<number, number> | ScaleTime<number, number>;
		yScale: ScaleLinear<number, number>;
		color?: string;
	}

	const { xKey } = getContext(X_AXES_CONTEXT) as {
		xKey: string;
	};

	const { yKey, yScale } = getContext(Y_AXES_CONTEXT) as {
		yKey: string;
		yScale: ScaleLinear<number, number>;
	};
	const { width, height, margin, data } = getContext(CHART_CONTEXT) as Context<
		Record<string, number>
	>;

	let categories = $derived(data.map((d) => d[xKey]));
</script>

<g id="rects">
	{#each categories as category, i}
		<rect
			x={xScale(category)}
			y={yScale(data[i][yKey])}
			height={height - margin.bottom - yScale(data[i][yKey])}
			width={xScale.bandwidth()}
		/>
	{/each}
</g>
