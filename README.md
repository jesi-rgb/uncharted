# Uncharted

introducing Uncharted: a new natively reactive, composable and typesafe chart library + tooling for #svelte5. 

```svelte
<script lang="ts">
	import { Chart } from '$lib/index.js';
	interface DataPoint {
		category: string;
		value: number;
	}

	function generateRandomData(
		categories: number = 26,
		minValue: number = 0,
		maxValue: number = 500
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
```

bringing inspiration from libraries like Bits UI where components are built in "layers", Uncharted allows to bring in whatever layers you want for your chart, as well as allowing full customization of every layer. 

want a grid? you have it. want tooltips? you have'em. don't want X axis? just don't include them.

want to make a custom and reusable tooltip? make a "MyTooltip.svelte" component and use that instead. sky's the limit. peek into the uncharted!
