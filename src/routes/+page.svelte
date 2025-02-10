<script lang="ts">
	import { Chart } from '$lib/index.js';

	const data = [
		{ category: 'A', value: 10 },
		{ category: 'B', value: 20 },
		{ category: 'C', value: 30 }
	];
</script>

<Chart.Root data={data} width={600} height={300} xKey="category" yKey="value">
	<Chart.Axes data={data} width={width} height={height} xKey={xKey} yKey={yKey}>
		{#snippet x({ props, scale, label, xScale })}
			<g {...props}>
				<!-- Custom X-axis rendering here -->
				<text>Custom X-Axis</text>
			</g>
		{/snippet}
		<Chart.Axes.Y label="Value" />
	</Chart.Axes>
	<Chart.Series>
		{#snippet children}
			<Chart.Series.Bar color="steelblue" />
		{/snippet}
	</Chart.Series>
</Chart.Root>
