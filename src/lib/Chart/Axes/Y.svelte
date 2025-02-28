<script lang="ts">
	import { axisLeft, format, select, type ScaleLinear } from 'd3';
	import { chartContext, yAxesContext } from '$lib/context.js';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	let chartState = chartContext.get();
	let axesState = yAxesContext.get();
	let { ...rest } = $props();

	let margin = $derived(chartState.margin);
	let yScale = $derived(axesState.yScale);

	let axis = $derived(axisLeft(yScale).tickSize(10).tickFormat(format('~s')));

	$effect(() => {
		const yAxisElement = select('#yAxis');
		if (yAxisElement) {
			yAxisElement.call(axis);
		}
	});
</script>

<g class="font-sans tabular-nums" id="yAxis" transform="translate({margin.left},0)" {...rest}> </g>
