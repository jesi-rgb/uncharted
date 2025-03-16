<script lang="ts">
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';

	// Get scales from context
	const { margin, width, height } = $derived($chartStore);

	const { yKey, yType, yScale } = $derived($yAxesStore);
	const { xKey, xType, xScale } = $derived($xAxesStore);

	interface Props {
		axis?: 'horizontal' | 'vertical' | 'both';
		stroke?: string;
		strokeWidth?: number;
		strokeDashArray?: string;
		opacity?: number;
	}

	const {
		axis = 'both',
		stroke = 'currentColor',
		strokeWidth = 1,
		strokeDashArray = '5 10',
		opacity = 0.3
	}: Props = $props();

	let xTicks = $derived.by(() => {
		if (xType === 'categorical') {
			return xScale.domain();
		} else {
			return xScale.ticks();
		}
	});
	let yTicks = $derived(yScale.ticks ? yScale.ticks() : []);

	let showXGrid = $derived(axis === 'horizontal' || axis === 'both');
	let showYGrid = $derived(axis === 'vertical' || axis === 'both');
</script>

{#if showXGrid}
	<g class="horizontal-lines" aria-hidden="true">
		{#each yTicks as yT}
			<line
				x1={margin.left}
				x2={width - margin.right}
				y1={yScale(yT)}
				y2={yScale(yT)}
				class="grid-line"
				{stroke}
				stroke-width={strokeWidth}
				stroke-dasharray={strokeDashArray}
				{opacity}
			/>
		{/each}
	</g>
{/if}

{#if showYGrid}
	<g class="vertical-lines" aria-hidden="true">
		{#each xTicks as xT}
			{#if xType === 'categorical'}
				<line
					x1={xScale(xT) + xScale.bandwidth() / 2}
					x2={xScale(xT) + xScale.bandwidth() / 2}
					y1={margin.top}
					y2={height - margin.bottom}
					class="grid-line"
					{stroke}
					stroke-width={strokeWidth}
					stroke-dasharray={strokeDashArray}
					{opacity}
				/>
			{:else}
				<line
					x1={xScale(xT)}
					x2={xScale(xT)}
					y1={margin.top}
					y2={height - margin.bottom}
					class="grid-line"
					{stroke}
					stroke-width={strokeWidth}
					stroke-dasharray={strokeDashArray}
					{opacity}
				/>
			{/if}
		{/each}
	</g>
{/if}

<style>
	.grid-line {
		vector-effect: non-scaling-stroke;
		shape-rendering: crispEdges;
	}
</style>
