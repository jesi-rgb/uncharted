<script lang="ts">
	import { chartContext, xAxesContext, yAxesContext } from '$lib/context.js';
	import { area, curveCatmullRom } from 'd3';

	interface Props {
		color?: string;
	}

	const { height, margin, data } = $derived(chartContext.get());

	let { color = '#69b3a2', opacity = 0.3 }: Props = $props();

	const { xKey, xScale } = $derived(xAxesContext.get());
	const { yKey, yScale } = $derived(yAxesContext.get());

	let categories = $derived(data.map((d) => d[xKey]));

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

	const areaChart = $derived(
		area()
			.x((d) => xScale(d[xKey]))
			.y0(height - margin.bottom)
			.y1((d) => yScale(d[yKey]))
			.curve(curveCatmullRom)
	);
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
