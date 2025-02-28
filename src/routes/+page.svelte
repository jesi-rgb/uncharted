<script lang="ts">
	import { Chart } from '$lib/index.js';
	interface DataPoint {
		category: string;
		value: number;
	}

	function generateRandomData(
		categories: number = 26,
		minValue: number = 0,
		maxValue: number = 1000
	): DataPoint[] {
		return Array.from({ length: categories }, (_, i) => ({
			category: String.fromCharCode(65 + i),
			value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
		}));
	}

	let data = $state(generateRandomData());
	setInterval(() => {
		data = generateRandomData();
	}, 1000);
</script>

<div class="mb-10">
	<h2 class="font-bold">Uncharted</h2>
	<p class="text-sm">Composable, reactive, and typesafe charts, native to svelte 5</p>
</div>

<Chart.Root {data} margin={{ left: 50, top: 30, right: 30 }}>
	<Chart.AxesContainer xKey="category" yKey="value">
		<Chart.Axes.Y />
		<Chart.Axes.X />
		<Chart.Series.Bar />
	</Chart.AxesContainer>
</Chart.Root>
