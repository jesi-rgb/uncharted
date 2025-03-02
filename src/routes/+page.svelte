<script lang="ts">
	import { generateBarData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData, generateMultiLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';
	import { bin, randomNormal, randomUniform } from 'd3';

	const ageHistogramData = $derived(generateBarData({ distribution: 'normal' }));
	const barData = $derived(generateBarData({ distribution: 'pareto', categories: 100 }));
	const lineData = generateLineData();
	const lineData2 = generateLineData();
	console.log(lineData);
</script>

<div class="grid grid-cols-2">
	<div>
		<div class="mb-10">
			<h2 class="font-bold">Age Histogram</h2>
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
			<h2 class="font-bold">Pareto Distribution</h2>
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
			<h2 class="font-bold">Extremely bad data</h2>
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
			<h2 class="font-bold">Extremely bad data, fancier?</h2>
		</div>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.AxesContainer x="x" y="y">
				<Chart.Series.Area color="#FF0000" />
				<Chart.Layers.Grid axis="horizontal" />
				<Chart.Axes.Y />
				<Chart.Axes.X />
			</Chart.AxesContainer>
		</Chart.Root>
	</div>
</div>
