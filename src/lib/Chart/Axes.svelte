<script lang="ts" generics="T">
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';
	import { createScale } from '$lib/utils/infer-type.js';
	import { type Snippet } from 'svelte';

	// Get context values
	let { children, x: xKey, y: yKey }: { children: Snippet; x: keyof T; y: keyof T } = $props();

	// Create derived values that will automatically update
	let { data, margin, width, height, id } = $derived($chartStore);

	// Create reactive scales
	let { scale: xScale, type: xType } = $derived(
		createScale(data, xKey, [margin.left, width - margin.right])
	);

	let { scale: yScale, type: yType } = $derived(
		createScale(data, yKey, [height - margin.bottom, margin.top])
	);

	// Set context during initialization with getters that access reactive values
	xAxesStore.set({
		xKey,
		get xType() {
			return xType;
		},
		get xScale() {
			return xScale;
		}
	});

	yAxesStore.set({
		yKey,
		get yType() {
			return yType;
		},
		get yScale() {
			return yScale;
		}
	});
</script>

<g {id} class="axes font-sans">
	{@render children()}
</g>
