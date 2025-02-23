<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';
	import type { ChartContext } from '$lib/types.js';
	import { extent, scaleBand, scaleLinear } from 'd3';

	let { data, margin, width, height }: ChartContext = chartContext.get();
	let { children, xKey, yKey } = $props();

	let xScale = $derived(
		scaleBand()
			.domain(data.map((d) => d[xKey]))
			.range([margin.left, width - margin.right])
			.padding(0.4)
	);

	let xScaleWrapper = () => xScale;

	xAxesContext.set({ xKey, xScaleWrapper });

	let yScale = $derived(
		scaleLinear()
			.domain(extent(data.map((d) => d[yKey])))
			.range([height - margin.bottom, margin.top])
			.nice(2)
	);

	let yScaleWrapper = () => yScale;

	yAxesContext.set({ yKey, yScaleWrapper });
</script>

<g class="axes">
	{@render children()}
</g>
