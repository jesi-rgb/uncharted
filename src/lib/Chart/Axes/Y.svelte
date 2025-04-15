<script lang="ts">
	import { axisLeft, axisRight, scaleLog, select } from 'd3';
	import type { Scale, YAxisProps } from '$lib/types.js';
	import { chartStore, yAxesStore } from '$lib/stores.js';
	import { chartContext } from '$lib/context.js';

	let id = chartContext.get();

	let { margin, width } = $derived($chartStore[id]);
	let { scale: yScale } = $derived($yAxesStore[id] || { scale: undefined });

	let { right = false, log = false, ...rest }: YAxisProps = $props();

	let axisId = crypto.randomUUID();

	let axis = $derived.by(() => {
		if (right) return axisRight(yScale);

		if (log && yScale) {
			let logScale = scaleLog().domain(yScale.domain()).range(yScale.range());
			return axisLeft(logScale);
		}

		return axisLeft(yScale);
	});

	$effect(() => {
		select('#yAxis-' + id + '-' + axisId).call(axis);
	});
</script>

{#if right}
	<g id="yAxis-{id}-{axisId}" transform="translate({width - margin.right},0)" {...rest}> </g>
{:else}
	<g id="yAxis-{id}-{axisId}" transform="translate({margin.left},0)" {...rest}> </g>
{/if}

<style>
	g {
		font-feature-settings: 'tnum';
	}
	:global(.domain) {
		opacity: 0.3;
	}
</style>
