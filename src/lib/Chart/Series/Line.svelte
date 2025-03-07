<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';
	import { line } from 'd3';

	interface Props {
		color?: string;
		opacity?: number;
	}

	const { data } = $derived(chartContext.get());

	let { color = '#69b3a2', opacity = 1, ...rest }: Props = $props();

	const { xKey, xScale } = $derived(xAxesContext.get());
	const { yKey, yScale } = $derived(yAxesContext.get());

	let categories = $derived(data.map((d) => d[xKey]));

	const lineChart = $derived(
		line()
			.x((d) => xScale(d[xKey]))
			.y((d) => yScale(d[yKey]))
	);
</script>

<g id="line">
	<path {...rest} d={lineChart(data)} fill="none" stroke={color}></path>
</g>
