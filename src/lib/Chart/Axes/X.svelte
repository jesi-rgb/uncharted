<script lang="ts">
	import { CHART_CONTEXT, X_AXES_CONTEXT } from '$lib/context.js';
	import type { Context } from '$lib/types.js';
	import {
		axisBottom,
		extent,
		scaleBand,
		scaleLinear,
		select,
		type ScaleLinear,
		type ScaleTime
	} from 'd3';
	import { getContext, onMount, setContext } from 'svelte';

	interface Props<T extends { [key: string]: any }> {
		data: T[];
		width: number;
		key: keyof any;
	}

	let { data, width, height, margin } = getContext(CHART_CONTEXT) as Context<
		{ key: string; value: number }[]
	>;

	let { xKey }: { xKey: string } = $props();

	let xScale = $derived(
		scaleBand()
			.domain(data.map((d) => d[xKey]))
			.range([margin.left, width - margin.right])
			.padding(0.3)
	);

	let axis = $derived(axisBottom(xScale));

	onMount(() => {
		setContext(X_AXES_CONTEXT, { xKey });
	});

	$effect(() => {
		select('.xAxis').call(axis);
	});
</script>

<g class="xAxis" transform="translate(0, {height - margin.bottom})" />

<style>
</style>
