<script lang="ts" generics="T">
	import { chartContext } from '$lib/context.js';

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

	chartContext.set({ data, width, height, margin });
</script>

<div bind:clientWidth={width}>
	<svg {width} {height} class="border-base-content/10 border" {...rest}>
		{@render children({ data, width, height, xKey, yKey })}
	</svg>
</div>
