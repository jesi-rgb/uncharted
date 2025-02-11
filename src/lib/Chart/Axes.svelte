<script lang="ts">
	import { CHART_CONTEXT } from '$lib/context.js';
	import type { Context } from '$lib/types.js';
	import { getContext } from 'svelte';

	//interface Props<T extends { [key: string]: any }> {
	//	data: T[];
	//	width: number;
	//	height: number;
	//	xKey?: keyof T;
	//	yKey?: keyof T;
	//	xAxis?: (args: { data: T[]; width: number; xKey?: keyof T }) => any;
	//	yAxis?: (args: { data: T[]; height: number; yKey?: keyof T }) => any;
	//}

	interface Props {
		// it will receive two children for the x and y axis that are components
		// themselves
		children: {
			xAxis;
		};
	}

	let { data, width, height } = getContext(CHART_CONTEXT) as Context<Record<string, number>>;

	let { children }: Props = $props();
</script>

<g class="axes">
	<g id="xAxis">{@render xAxis({ data, width })} </g>
	<g id="yAxis">{@render yAxis({ data, height })} </g>
</g>
