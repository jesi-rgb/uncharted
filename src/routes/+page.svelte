<script lang="ts">
	import { generateBarData, generateTimeSeriesData } from '$lib/data-generators/bar-gen.js';
	import { generateLineData } from '$lib/data-generators/shape-gen.js';
	import { Chart } from '$lib/index.js';

	const ageHistogramData = generateBarData({ distribution: 'normal' });
	const barData = $derived(generateBarData({ distribution: 'pareto', categories: 100 }));
	const lineData = generateLineData({ points: 1000, minY: 0, maxY: 400000, noise: 0.001 });
	const lineData2 = generateLineData();

	const timeData = generateTimeSeriesData({
		count: 20,
		uniqueItems: 3,
		distribution: 'seasonal'
	});

	let value = $state(0);
</script>

<div>
	<div>
		<div>
			<h2>Age Histogram</h2>
			<p>Grid, bars, histogram</p>
		</div>

		<Chart.Root data={ageHistogramData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Bar x="category" y="value" innerPadding={value} />
			<Chart.Axes.Y />
			<Chart.Axes.X />
			<Chart.Layers.Grid />
		</Chart.Root>
		<div>
			<input
				id="padding-slider"
				class="padding-input"
				type="range"
				min="0"
				max="1"
				step="0.01"
				bind:value
			/>
		</div>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Area x="x" y="y" />
			<Chart.Axes.Y />
			<Chart.Axes.X />
		</Chart.Root>

		<Chart.Root data={lineData} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
			<Chart.Line x="x" y="y" curve="none" />
			<Chart.Axes.Y log />
			<Chart.Axes.X />
		</Chart.Root>
	</div>
</div>

<style>
	h2 {
		font-family: var(--font-title);
		font-size: 1rem;
	}

	.padding-input {
		height: 10px;
		-webkit-appearance: none;
		appearance: none;
		background: #303030;
		border-radius: 3px;
		margin: 1rem 0 2rem;
		outline: none;
	}

	.padding-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-primary, #3b82f6);
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition:
			background 0.2s,
			transform 0.1s;
	}

	.padding-input::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ffff01;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition:
			background 0.2s,
			transform 0.1s;
	}

	.padding-input::-webkit-slider-thumb:hover,
	.padding-input::-moz-range-thumb:hover {
		background: var(--color-primary-dark, #2563eb);
		transform: scale(1.1);
	}

	.padding-input::-webkit-slider-thumb:active,
	.padding-input::-moz-range-thumb:active {
		transform: scale(0.95);
	}

	.padding-input:focus {
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
	}
</style>
