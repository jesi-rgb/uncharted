<script lang="ts" generics="T extends DataPoint">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';
	import { type ChartContext, type DataPoint } from '$lib/types.js';
	import { createScale } from '$lib/utils/infer-type.js';
	import { type Snippet } from 'svelte';

	// Get context values
	let { children, x: xKey, y: yKey }: { children: Snippet; x: keyof T; y: keyof T } = $props();

	// Create derived values that will automatically update
	let { data, margin, width, height, id }: ChartContext<T> = $derived(chartContext.get());

	// Create reactive scales
	let { scale: xScale } = $derived(createScale(data, xKey, [margin.left, width - margin.right]));

	let { scale: yScale, type } = $derived(
		createScale(data, yKey, [height - margin.bottom, margin.top])
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

<g {id} class="axes font-sans">
	{@render children()}
</g>
