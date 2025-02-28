<script lang="ts">
	import { chartContext, xAxesContext } from '$lib/context.js';
	import { axisBottom, select } from 'd3';

	// Get context values during initialization
	let chartState = chartContext.get();
	let axesState = xAxesContext.get();

	// Create derived values that will automatically update
	let height = $derived(chartState.height);
	let margin = $derived(chartState.margin);
	let xScale = $derived(axesState.xScale);
	let axis = $derived(axisBottom(xScale));

	// DOM manipulation in effect
	$effect(() => {
		const xAxisElement = select('.xAxis');
		if (xAxisElement) {
			xAxisElement.call(axis);
		}
	});
</script>

<g class="xAxis" transform="translate(0, {height - margin.bottom})" />
