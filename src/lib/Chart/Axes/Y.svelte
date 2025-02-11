<script lang="ts">
	import { axisLeft, scaleLinear, select, type ScaleLinear } from 'd3';
	import { extent, tickStep } from 'd3-array';
	import { format } from 'd3-format';
	import { getContext, onMount, setContext } from 'svelte';
	import type { Context } from '$lib/types.js';
	import { CHART_CONTEXT, Y_AXES_CONTEXT } from '$lib/context.js';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	let { data, height, margin } = getContext(CHART_CONTEXT) as Context<
		{ key: string; value: number }[]
	>;
	let { yKey }: { yKey: string } = $props();

	let yScale = $derived(
		scaleLinear()
			.domain(extent(data.map((d) => d[yKey])))
			.range([height - margin.bottom, margin.top])
			.nice()
	);

	let axis = $derived(axisLeft(yScale));

	$effect(() => {
		select('.yAxis').call(axis);
	});

	onMount(() => {
		setContext(Y_AXES_CONTEXT, { yKey, yScale });
	});
</script>

<g class="yAxis" transform="translate({margin.left},0)"> </g>
