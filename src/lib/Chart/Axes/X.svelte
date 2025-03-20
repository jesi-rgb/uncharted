<script lang="ts">
	import { chartContext } from '$lib/context.js';
	import { chartStore, xAxesStore } from '$lib/stores.js';
	import type { AxisProps } from '$lib/types.js';
	import { axisBottom, select } from 'd3';

	let id = chartContext.get();

	let { height, margin, width } = $derived($chartStore[id] || {});
	let { key: xKey, scale: xScale, type: xType } = $derived($xAxesStore[id] || {});

	let { maxTicks = 10 }: AxisProps = $props();

	let axisId = crypto.randomUUID();

	// Ensure we're using the scale directly from the store without modifying its range
	$inspect('x', xScale?.range(), width);

	// For categorical scales (scaleBand), we need to manually limit the ticks
	let axis = $derived.by(() => {
		if (xType === 'categorical') {
			const axisGenerator = axisBottom(xScale);

			// If we have a scaleBand (categorical data)
			// Get the full domain
			const domain = xScale.domain();

			// Calculate how many items to skip to achieve desired tick count
			const step = Math.max(1, Math.floor(domain.length / maxTicks));

			// Create a filtered set of tick values
			const tickValues = domain.filter((_, i) => i % step === 0);

			// Apply the tick values to the axis
			axisGenerator.tickValues(tickValues);

			return axisGenerator;
		}
		return axisBottom(xScale).ticks(maxTicks);
	});

	$effect(() => {
		select('#xAxis-' + id + '-' + axisId).call(axis);
	});
</script>

<g class="font-sans" id="xAxis-{id}-{axisId}" transform="translate(0, {height - margin.bottom})"
></g>
