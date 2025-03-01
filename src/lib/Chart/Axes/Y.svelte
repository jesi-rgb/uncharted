<script lang="ts">
	import { axisLeft, format, select, type ScaleLinear } from 'd3';
	import { chartContext, yAxesContext } from '$lib/context.js';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	let { margin, id } = $derived(chartContext.get());
	let { yScale } = $derived(yAxesContext.get());
	let { ...rest } = $props();

	let axis = $derived(axisLeft(yScale).tickSize(10).tickFormat(format('~s')));

	$effect(() => {
		const yAxisElement = select('#yAxis-' + id);
		if (yAxisElement) {
			yAxisElement.call(axis);
		}
	});
</script>

<g class="font-sans tabular-nums" id="yAxis-{id}" transform="translate({margin.left},0)" {...rest}>
</g>
