<script lang="ts">
	import { generateBarData, generateTimeSeriesData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';

	const ageHistogramData = generateBarData({ distribution: 'normal' });
	const barData = $derived(generateBarData({ distribution: 'pareto', categories: 100 }));
	const lineData = generateLineData({ points: 100, maxY: 50, noise: 0.001 });
	const lineData2 = generateLineData();

	const timeData = generateTimeSeriesData({
		count: 20,
		uniqueItems: 3,
		distribution: 'seasonal'
	});

	const weatherData = [
		{
			value: 0,
			periodo: 7,
			dateTime: '2025-03-21T06:00:00.000Z'
		},
		{
			value: 0,
			periodo: 8,
			dateTime: '2025-03-21T07:00:00.000Z'
		},
		{
			value: 0,
			periodo: 9,
			dateTime: '2025-03-21T08:00:00.000Z'
		},
		{
			value: 0,
			periodo: 10,
			dateTime: '2025-03-21T09:00:00.000Z'
		},
		{
			value: 0,
			periodo: 11,
			dateTime: '2025-03-21T10:00:00.000Z'
		},
		{
			value: 0.1,
			periodo: 12,
			dateTime: '2025-03-21T11:00:00.000Z'
		},
		{
			value: 0,
			periodo: 13,
			dateTime: '2025-03-21T12:00:00.000Z'
		},
		{
			value: 0,
			periodo: 14,
			dateTime: '2025-03-21T13:00:00.000Z'
		},
		{
			value: 0.2,
			periodo: 15,
			dateTime: '2025-03-21T14:00:00.000Z'
		},
		{
			value: 0.3,
			periodo: 16,
			dateTime: '2025-03-21T15:00:00.000Z'
		},
		{
			value: 1,
			periodo: 17,
			dateTime: '2025-03-21T16:00:00.000Z'
		},
		{
			value: 2,
			periodo: 18,
			dateTime: '2025-03-21T17:00:00.000Z'
		},
		{
			value: 5,
			periodo: 19,
			dateTime: '2025-03-21T18:00:00.000Z'
		},
		{
			value: 1,
			periodo: 20,
			dateTime: '2025-03-21T19:00:00.000Z'
		},
		{
			value: 0.5,
			periodo: 21,
			dateTime: '2025-03-21T20:00:00.000Z'
		},
		{
			value: 0,
			periodo: 22,
			dateTime: '2025-03-21T21:00:00.000Z'
		},
		{
			value: 0,
			periodo: 23,
			dateTime: '2025-03-21T22:00:00.000Z'
		}
	];
</script>

<div>
	<div>
		<div>
			<h2>Age Histogram</h2>
			<p>Grid, bars, histogram</p>
		</div>

		<Chart.Root data={weatherData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Bar x="dateTime" y="value" />
			<Chart.Axes.Y />
			<Chart.Axes.X />
			<Chart.Layers.Grid />
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
