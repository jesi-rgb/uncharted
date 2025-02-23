<script lang="ts">
	import { Chart } from '$lib/index.js';

	const data = [
		{ category: 'A', value: 10 },
		{ category: 'B', value: 20 },
		{ category: 'C', value: 10 },
		{ category: 'D', value: 40 },
		{ category: 'E', value: 30 },
		{ category: 'F', value: 60 }
	];
</script>

<Chart.Root {data} margin={{ left: 30, top: 10, right: 10 }}>
	<Chart.AxesContainer xKey="category" yKey="value">
		<Chart.Axes.Y />
		<Chart.Axes.X />
		<Chart.Series.Bar />
	</Chart.AxesContainer>
</Chart.Root>
