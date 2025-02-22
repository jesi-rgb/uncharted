<script lang="ts">
	import { axisLeft, select, type ScaleLinear } from 'd3';
	import { chartContext, yAxesContext } from '$lib/context.js';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	let { margin } = chartContext.get();
	let { ...rest } = $props();

	let { yScaleWrapper } = yAxesContext.get();
	let yScale = yScaleWrapper();

	let axis = $derived(axisLeft(yScale));

	$effect(() => {
		select('.yAxis').call(axis);
	});
</script>

<g class="yAxis" transform="translate({margin.left},0)" {...rest}> </g>

<style>
	.yAxis {
		font-variant-numeric: tabular-nums;
	}
</style>
