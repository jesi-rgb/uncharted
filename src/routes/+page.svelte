<script lang="ts">
	import { generateBarData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData, generateMultiLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';
	import { bin, randomNormal, randomUniform } from 'd3';

	const ageHistogramData = generateBarData({ distribution: 'normal' });
	const barData = $derived(generateBarData({ distribution: 'pareto', categories: 100 }));
	const lineData = generateLineData();
	const lineData2 = generateLineData();
	console.log(ageHistogramData);
</script>

<div class="grid grid-cols-2">
	<div>
		<div class="mb-10">
			<h2 class="font-title">Age Histogram</h2>
			<p>Grid, bars, histogram</p>
		</div>

		<Chart.Root data={ageHistogramData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="category" y="value">
				<Chart.Series.Bar />
				<Chart.Layers.Grid />
				<Chart.Axes.Y />
				<Chart.Axes.X />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>

	<div>
		<div class="mb-10">
			<h2 class="font-title">Pareto Distribution</h2>
		</div>

		<Chart.Root data={barData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="category" y="value">
				<Chart.Layers.Grid axis="horizontal" />
				<Chart.Series.Bar />
				<Chart.Axes.Y />
				<Chart.Axes.X />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>

	<div>
		<div class="mb-10">
			<h2 class="font-title">Extremely bad data</h2>
		</div>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="x" y="y">
				<Chart.Series.Line color="red" />
				<Chart.Layers.Grid axis="horizontal" />
				<Chart.Axes.Y />
				<Chart.Axes.X />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>

	<div>
		<div class="mb-10">
			<h2 class="font-title">Extremely bad data, fancier?</h2>
		</div>

		<Chart.Root data={lineData2} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="x" y="y">
				<Chart.Series.Area />
				<Chart.Layers.Grid axis="horizontal" />
				<Chart.Axes.Y />
				<Chart.Axes.X />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>
</div>
