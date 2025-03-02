<script lang="ts">
	import { axisLeft, axisRight, format, select, type ScaleLinear } from 'd3';
	import { chartContext, yAxesContext } from '$lib/context.js';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	let { margin, id, width } = $derived(chartContext.get());
	let { yScale } = $derived(yAxesContext.get());
	let { right = false, ...rest } = $props();

	let axisId = crypto.randomUUID();

	let axis = $derived.by(() => {
		if (right) {
			return axisRight(yScale).tickSize(6).tickFormat(format('~s'));
		} else {
			return axisLeft(yScale).tickSize(6).tickFormat(format('~s'));
		}
	});

	$effect(() => {
		const yAxisElement = select('#yAxis-' + id + '-' + axisId);
		if (yAxisElement) {
			yAxisElement.call(axis);
		}
	});
</script>

{#if right}
	<g
		class="font-sans tabular-nums"
		id="yAxis-{id}-{axisId}"
		transform="translate({width - margin.right},0)"
		{...rest}
	>
	</g>
{:else}
	<g
		class="font-sans tabular-nums"
		id="yAxis-{id}-{axisId}"
		transform="translate({margin.left},0)"
		{...rest}
	>
	</g>
{/if}
