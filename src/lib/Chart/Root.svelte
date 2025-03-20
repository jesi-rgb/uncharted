<script lang="ts" generics="T extends Record<string, any>">
	import { chartContext } from '$lib/context.js';
	import { chartStore } from '$lib/stores.js';
	import type { RootProps } from '$lib/types.js';

	const id = crypto.randomUUID();
	let defaultMargin = { top: 0, right: 0, bottom: 40, left: 20 };
	let {
		data,
		width,
		height = 450,
		margin = defaultMargin,
		children,
		...rest
	}: RootProps<T> = $props();

	let chartWidth: number = $state(width || 800);
	//$inspect(chartWidth);

	let computedMargin = $derived({ ...defaultMargin, ...margin });

	chartContext.set(id);

	// Set context during initialization
	chartStore.update((store) => {
		return {
			...store,
			[id]: {
				get data() {
					return data;
				},
				get width() {
					return chartWidth;
				},
				get height() {
					return height;
				},
				get margin() {
					return computedMargin;
				}
			}
		};
	});
</script>

<div bind:clientWidth={chartWidth}>
	<svg width={chartWidth} {height} {...rest}>
		{@render children()}
	</svg>
</div>
