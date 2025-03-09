<script lang="ts">
	import { generateBarData, generateTimeSeriesData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';

	const ageHistogramData = generateBarData({ distribution: 'normal' });
	const barData = $derived(generateBarData({ distribution: 'pareto', categories: 100 }));
	const lineData = generateLineData();
	const lineData2 = generateLineData();

	const timeData = generateTimeSeriesData({
		count: 50,
		uniqueItems: 3,
		distribution: 'seasonal'
	});
</script>

<div>
	<div>
		<div>
			<h2>Age Histogram</h2>
			<p>Grid, bars, histogram</p>
		</div>

		<Chart.Root data={ageHistogramData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="category" y="value">
				<Chart.Bar />
				<Chart.Layers.Grid />
				<Chart.Axes.Y />
				<Chart.Axes.X maxTicks={4} />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>

	<div>
		<div class="mb-10">
			<h2>Pareto Distribution</h2>
		</div>

		<Chart.Root data={barData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="category" y="value">
				<Chart.Layers.Grid axis="horizontal" />
				<Chart.Bar />
				<Chart.Axes.Y />
				<Chart.Axes.X maxTicks={100} />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>

	<div>
		<div class="mb-10">
			<h2>Extremely bad data</h2>
		</div>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Line x="x" y="y" color="red" />
			<Chart.Layers.Grid />
			<Chart.Axes.Y />
			<Chart.Axes.X maxTicks={20} />
		</Chart.Root>
	</div>

	<div>
		<div class="mb-10">
			<h2>Extremely bad data, fancier?</h2>
		</div>

		<Chart.Root data={lineData2} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Area x="x" y="y" />
			<Chart.Layers.Grid />
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
