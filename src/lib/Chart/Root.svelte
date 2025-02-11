<script lang="ts">
	import { CHART_CONTEXT } from '$lib/context.js';
	import { setContext } from 'svelte';
	import { type Context } from '$lib/types.js';

	interface Props<T extends { [key: string]: any }> {
		data: T[];
		width?: number;
		height?: number;
		xKey?: keyof T;
		yKey?: keyof T;
		margin?: {
			top?: number;
			right?: number;
			bottom?: number;
			left?: number;
		};
		children: (args: {
			data: T[];
			width: number;
			height: number;
			xKey?: keyof T;
			yKey?: keyof T;
		}) => any;
	}

	let defaultMargin = { top: 0, right: 0, bottom: 40, left: 20 };
	let {
		data,
		width = 700,
		height = 300,
		margin = defaultMargin,
		xKey,
		yKey,
		children,
		...rest
	}: Props<any> = $props();

	// combine whatever the user specifies with the default in margin
	margin = { ...defaultMargin, ...margin };

	setContext(CHART_CONTEXT, {
		data,
		width,
		height,
		margin,
		xKey,
		yKey
	});
</script>

<svg {width} {height} class="border border-black/10" {...rest}>
	{@render children({ data, width, height, xKey, yKey })}
</svg>
