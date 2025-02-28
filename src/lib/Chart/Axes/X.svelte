<script lang="ts">
	import { chartContext, xAxesContext } from '$lib/context.js';
	import { axisBottom, select } from 'd3';

	let { height, margin } = $derived(chartContext.get());
	let { xKey, xScale } = $derived(xAxesContext.get());

	let axis = $derived(axisBottom(xScale));

	$effect(() => {
		const xAxisElement = select('#xAxis');
		if (xAxisElement) {
			xAxisElement.call(axis);
		}
	});
</script>

<g class="font-sans" id="xAxis" transform="translate(0, {height - margin.bottom})"></g>
