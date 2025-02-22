<script lang="ts">
	import { chartContext, xAxesContext } from '$lib/context.js';
	import { axisBottom, select } from 'd3';

	let { height, margin } = chartContext.get();

	let { xScaleWrapper } = xAxesContext.get();

	let xScale = xScaleWrapper();

	let axis = $derived(axisBottom(xScale));

	$effect(() => {
		select('.xAxis').call(axis);
	});
</script>

<g class="xAxis" transform="translate(0, {height - margin.bottom})" />
