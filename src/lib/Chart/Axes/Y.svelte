<script lang="ts">
	import { axisLeft, axisRight, format, select, type ScaleLinear } from 'd3';
	import type { AxisProps } from '$lib/types.js';
	import { chartStore, yAxesStore } from '$lib/stores.js';

	let { margin, id, width } = $derived($chartStore);
	let { yScale } = $derived($yAxesStore);
	let { right = false, ...rest }: AxisProps = $props();

	let axisId = crypto.randomUUID();

	let axis = $derived.by(() => {
		let axis;
		if (right) {
			axis = axisRight(yScale);
		} else {
			axis = axisLeft(yScale);
		}
		return axis;
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
