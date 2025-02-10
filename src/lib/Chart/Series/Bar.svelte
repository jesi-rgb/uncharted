<script lang="ts">
	import type { ScaleLinear, ScaleTime } from 'd3';

	interface Props<T extends { [key: string]: any }> {
		data: T[];
		xKey: keyof T;
		yKey: keyof T;
		xScale: ScaleLinear<number, number> | ScaleTime<number, number>;
		yScale: ScaleLinear<number, number>;
		color?: string;
	}

	let { data, xKey, yKey, xScale, yScale, color = 'steelblue' } = $props() as Props<any>;
</script>

{#each data as d}
	<rect
		x={xScale(d[xKey])}
		y={yScale(d[yKey])}
		width={10}
		height={yScale(0) - yScale(d[yKey])}
		fill={color}
	/>
{/each}
