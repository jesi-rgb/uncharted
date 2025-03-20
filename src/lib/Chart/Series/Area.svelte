<script lang="ts">
	import { chartContext } from '$lib/context.js';
	import { chartStore, xAxesStore, yAxesStore } from '$lib/stores.js';
	import { createScale } from '$lib/utils/infer-type.js';
	import { area, curveBasis, curveCardinal, curveCatmullRom, curveMonotoneX, curveStep } from 'd3';

	interface Props {
		x: string;
		y: string;
		series?: string;
		color?: string;
		curve?: 'none' | 'curved' | 'monotone' | 'step';
		opacity?: number;
	}

	const id = chartContext.get();

	const { width, height, margin, data } = $derived($chartStore[id]);

	let { x, y, color = '#69b3a2', series, opacity = 0.3, curve = 'none' }: Props = $props();

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

	$effect(() => {
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
	});

	// Create transparent fill color
	let fillColor = $derived.by(() => {
		// If color is already in rgba format
		if (color.startsWith('rgba')) {
			return color;
		}

		// If color is in hex format
		if (color.startsWith('#')) {
			// Convert hex to rgb
			const r = parseInt(color.slice(1, 3), 16);
			const g = parseInt(color.slice(3, 5), 16);
			const b = parseInt(color.slice(5, 7), 16);
			return `rgba(${r}, ${g}, ${b}, ${opacity})`;
		}

		// If color is in rgb format
		if (color.startsWith('rgb(')) {
			// Extract rgb values
			const rgbValues = color.match(/\d+/g);
			if (rgbValues && rgbValues.length >= 3) {
				return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
			}
		}

		// Fallback for other color formats
		return color;
	});

	const areaChart = $derived.by(() => {
		let a = area()
			.x((d) => xScale(d[x]))
			.y0(height - margin.bottom)
			.y1((d) => yScale(d[y]))
			.curve(curveBasis);

		switch (curve) {
			case 'curved':
				a.curve(curveBasis);
				break;
			case 'monotone':
				a.curve(curveMonotoneX);
				break;
			case 'step':
				a.curve(curveStep);
				break;
			default:
				break;
		}

		return a;
	});
</script>

<defs>
	<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
		<stop offset="5%" stop-color={fillColor} />
		<stop offset="95%" stop-color={fillColor} stop-opacity={0} />
	</linearGradient>
</defs>
<g id="area">
	<path d={areaChart(data)} fill={'url(#gradient)'} stroke-width="1.2" stroke={color}></path>
</g>
