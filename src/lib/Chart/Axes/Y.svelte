<script lang="ts">
	import { axisLeft, format, select, type ScaleLinear } from 'd3';
	import { chartContext, yAxesContext } from '$lib/context.js';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	// Get context values during initialization
	let chartState = chartContext.get();
	let axesState = yAxesContext.get();
	let { ...rest } = $props();

	// Create derived values that will automatically update
	let margin = $derived(chartState.margin);
	let yScale = $derived(axesState.yScale);
	let axis = $derived(axisLeft(yScale).tickFormat(format('~s')));

	// DOM manipulation in effect
	$effect(() => {
		const yAxisElement = select('.yAxis');
		if (yAxisElement) {
			yAxisElement.call(axis);
		}
	});
</script>

<g class="yAxis" transform="translate({margin.left},0)" {...rest}> </g>

<style>
	.yAxis {
		font-variant-numeric: tabular-nums;
	}
</style>
