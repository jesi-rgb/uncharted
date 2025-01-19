<script lang="ts">
	import type {
		ChartData,
		Dimensions,
		ChartScales,
		ChartContext,
		Margin,
		D3Scale
	} from '../types.js';
	import { setContext, SvelteComponent, type ComponentProps } from 'svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';

	let {
		data,
		width = 600,
		height = 400,
		margin = { top: 20, right: 20, bottom: 30, left: 40 },
		children,
		...others
	} = $props<{
		data: ChartData;
		width?: number;
		height?: number;
		margin?: Margin;
		others?: ComponentProps<SvelteComponent>;
	}>();

	let container: SVGGElement;

	// Create dimensions state
	let dimensions = $state<Dimensions>({
		width,
		height,
		margin
	});

	// Initialize with default linear scales
	let scales = $state<ChartScales>({
		x: scaleBand() as D3Scale<'band'>,
		y: scaleLinear() as D3Scale<'linear'>
	});

	// Update dimensions when props change
	$effect(() => {
		dimensions = {
			width,
			height,
			margin
		};
	});

	// Context getter function
	function getChartContext(): ChartContext {
		return {
			data,
			dimensions,
			scales
		};
	}

	setContext('chart', getChartContext);
</script>

<svg {width} {height} {...others}>
	<g bind:this={container} transform="translate({dimensions.margin.left},{dimensions.margin.top})">
		{@render children?.()}
	</g>
</svg>
