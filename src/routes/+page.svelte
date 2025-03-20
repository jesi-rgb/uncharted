<script lang="ts">
	import { generateBarData, generateTimeSeriesData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';

	const ageHistogramData = generateBarData({ distribution: 'normal' });
	const barData = $derived(generateBarData({ distribution: 'pareto', categories: 100 }));
	const lineData = generateLineData({ points: 100, maxY: 50, noise: 0.001 });
	const lineData2 = generateLineData();

	const timeData = generateTimeSeriesData({
		count: 50,
		uniqueItems: 3,
		distribution: 'seasonal'
	});

	console.log(lineData);
</script>

<div>
	<div>
		<div>
			<h2>Age Histogram</h2>
			<p>Grid, bars, histogram</p>
		</div>

		<Chart.Root data={ageHistogramData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Bar x="category" y="value" />
			<Chart.Axes.Y />
			<Chart.Axes.X />
		</Chart.Root>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Area x="x" y="y" />
			<Chart.Axes.Y />
			<Chart.Axes.X />
		</Chart.Root>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Line x="x" y="y" curve="none" />
			<Chart.Axes.Y />
			<Chart.Axes.X />
		</Chart.Root>
	</div>
</div>

<style>
	h2 {
		font-family: var(--font-title);
		font-size: 1rem;
	}
</style>
