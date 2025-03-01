<script lang="ts">
	import { generateBarData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';

	const barData = generateBarData({ categories: 100, distribution: 'pareto' });

	console.log(barData);

	const lineData = generateLineData({ points: 1000, minY: -100, maxY: 100 });
	console.log(barData);
</script>

<div class="mb-10">
	<h2 class="font-bold">Uncharted</h2>
	<p class="text-sm">Composable, reactive, and typesafe charts, native to svelte 5</p>
</div>

<Chart.Root data={barData} margin={{ left: 50, top: 30, right: 30 }}>
	<Chart.AxesContainer x="category" y="value">
		<Chart.Series.Bar />
		<Chart.Axes.Y />
		<Chart.Axes.X />
		<Chart.Layers.Grid />
	</Chart.AxesContainer>
</Chart.Root>

<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30 }}>
	<Chart.AxesContainer x="x" y="y">
		<Chart.Series.Area />
		<Chart.Axes.Y />
		<Chart.Axes.X />
	</Chart.AxesContainer>
</Chart.Root>
