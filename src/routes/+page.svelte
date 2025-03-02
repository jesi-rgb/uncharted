<script lang="ts">
	import { generateBarData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData, generateMultiLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';
	import { bin, randomNormal, randomUniform } from 'd3';

	const ageHistogramData = $derived(generateBarData({ distribution: 'normal' }));

	console.log(ageHistogramData);
</script>

<div class="mb-10">
	<h2 class="font-bold">Age Histogram</h2>
</div>

<Chart.Root data={ageHistogramData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
	<Chart.AxesContainer x="category" y="value">
		<Chart.Series.Bar color="steelblue" />
		<Chart.Layers.Grid />
		<Chart.Axes.Y />
		<Chart.Axes.X />
	</Chart.AxesContainer>

	<Chart.AxesContainer x="category" y="averageAge">
		<Chart.Series.Bar patternAngle={-50} color="hotpink" />
		<Chart.Axes.Y right />
	</Chart.AxesContainer>
</Chart.Root>
