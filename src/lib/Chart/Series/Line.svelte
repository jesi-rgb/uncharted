<script lang="ts">
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';
	import { createScale } from '$lib/utils/infer-type.js';
	import { line } from 'd3';

	interface Props {
		x: string;
		y: string;
		series?: string;
		color?: string;
		opacity?: number;
	}

	let { id, data, margin, width, height } = $derived($chartStore);
	const { x, y, series, color = '#69b3a2', opacity, ...rest }: Props = $props();

	let renderData = $derived.by(() => {
		if (series) {
			return data[series];
		} else {
			return data;
		}
	});

	let { scale: xScale, type: xType } = $derived(
		createScale(renderData, x, [margin.left, width - margin.right])
	);

	let { scale: yScale, type: yType } = $derived(
		createScale(renderData, y, [height - margin.bottom, margin.top])
	);

	xAxesStore.update((store) => {
		return {
			...store,
			[id]: {
				key: x,
				type: xType,
				scale: xScale
			}
		};
	});

	yAxesStore.update((store) => {
		return {
			...store,
			[id]: {
				key: y,
				type: yType,
				scale: yScale
			}
		};
	});

	const lineChart = $derived(
		line()
			.x((d) => xScale(d[x]))
			.y((d) => yScale(d[y]))
	);
</script>

<g id="line">
	<path {...rest} d={lineChart(renderData)} fill="none" stroke={color}></path>
</g>
