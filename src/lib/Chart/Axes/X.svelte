<script lang="ts">
	import { chartContext, xAxesContext } from '$lib/context.js';
	import { axisBottom, select } from 'd3';

	interface Props {
		maxTicks?: number;
	}

	let { maxTicks = 10 } = $props<Props>();
	let { height, margin, id } = $derived(chartContext.get());
	let { xKey, xScale } = $derived(xAxesContext.get());
	let chartData = $derived(chartContext.get().data);

	// For categorical scales (scaleBand), we need to manually limit the ticks
	let axis = $derived.by(() => {
		const axisGenerator = axisBottom(xScale);

		// If we have a scaleBand (categorical data)
		if (xScale.bandwidth && chartData.length > maxTicks) {
			// Get the full domain
			const domain = xScale.domain();

			// Calculate how many items to skip to achieve desired tick count
			const step = Math.max(1, Math.floor(domain.length / maxTicks));

			// Create a filtered set of tick values
			const tickValues = domain.filter((_, i) => i % step === 0);

			// Apply the tick values to the axis
			axisGenerator.tickValues(tickValues);
		}

		return axisGenerator;
	});

	$effect(() => {
		const xAxisElement = select('#xAxis-' + id);
		if (xAxisElement) {
			xAxisElement.call(axis);
		}
	});
</script>

<g class="font-sans" id="xAxis-{id}" transform="translate(0, {height - margin.bottom})"></g>
