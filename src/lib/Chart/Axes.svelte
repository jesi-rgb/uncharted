<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';
	import type { ChartContext } from '$lib/types.js';
	import { extent, scaleBand, scaleLinear } from 'd3';

	// Get context values
	let chartState: ChartContext = chartContext.get();
	let { children, xKey, yKey } = $props();

	// Create derived values that will automatically update
	let data = $derived(chartState.data);
	let margin = $derived(chartState.margin);
	let width = $derived(chartState.width);
	let height = $derived(chartState.height);

	// Create reactive scales
	let xScale = $derived(
		scaleBand()
			.domain(data.map((d) => d[xKey]))
			.range([margin.left, width - margin.right])
			.padding(0.4)
	);

	let yScale = $derived(
		scaleLinear()
			.domain(extent(data.map((d) => d[yKey])) || [0, 1])
			.range([height - margin.bottom, margin.top])
			.nice(2)
	);

	// Set context during initialization with getters that access reactive values
	xAxesContext.set({
		xKey,
		get xScale() {
			return xScale;
		}
	});

	yAxesContext.set({
		yKey,
		get yScale() {
			return yScale;
		}
	});
</script>

<g class="axes">
	{@render children()}
</g>
