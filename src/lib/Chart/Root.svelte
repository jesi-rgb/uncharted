<script lang="ts" generics="T extends Record<string, any>">
	import { chartContext } from '$lib/context.js';
	import type { RootProps } from '$lib/types.js';

	const id = crypto.randomUUID();
	let defaultMargin = { top: 0, right: 0, bottom: 40, left: 20 };
	let {
		data,
		width = 700,
		height = 300,
		margin = defaultMargin,
		children,
		...rest
	}: RootProps<T> = $props();

	let computedMargin = $derived({ ...defaultMargin, ...margin });

	// Set context during initialization
	chartContext.set({
		get data() {
			return data;
		},
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get margin() {
			return computedMargin;
		},
		get id() {
			return id;
		}
	});
</script>

<div bind:clientWidth={width}>
	<svg {width} {height} {...rest}>
		{@render children()}
	</svg>
</div>
