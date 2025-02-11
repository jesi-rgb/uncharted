<script lang="ts">
	import { Chart } from '$lib/index.js';

	const data = [
		{ category: 'A', value: 10 },
		{ category: 'B', value: 20 },
		{ category: 'C', value: 30 },
		{ category: 'D', value: 40 },
		{ category: 'E', value: 50 },
		{ category: 'F', value: 60 }
	];
</script>

<Chart.Root {data} width={300} height={300} margin={{ left: 30, top: 10, right: 10 }}>
	<Chart.Axes.X xKey="category" />
	<Chart.Axes.Y yKey="value" />
	<Chart.Series.Bar />
</Chart.Root>
