<script lang="ts">
	import { generateTimeSeriesData } from '$lib/data-generators/bar-gen.js';
	import { Chart } from '$lib/index.js';

	/**
	 * Generates random stock market data similar to AAPL format
	 * @param count Number of data points to generate
	 * @param startDate Starting date for the data series
	 * @param basePrice Base price to start the random walk from
	 * @param volatility How much the price can change day-to-day (0-1)
	 * @returns Array of stock data objects
	 */
	function generateStockData({
		count = 30,
		startDate = new Date('2023-01-01'),
		basePrice = 150,
		volatility = 0.02
	} = {}) {
		const data = [];
		let currentDate = new Date(startDate);
		let lastClose = basePrice;

		for (let i = 0; i < count; i++) {
			const open = parseFloat(
				(lastClose * (1 + (Math.random() - 0.5) * volatility * 0.1)).toFixed(2)
			); // Slight variation for open from previous close
			const changePercent = (Math.random() - 0.5) * 2 * volatility; // Random change percentage
			let close = parseFloat((open * (1 + changePercent)).toFixed(2));

			// Ensure close price is positive
			if (close < 0) {
				close = Math.abs(close) * 0.1; // Reset to a small positive value if it goes negative
				if (close === 0) close = 0.01; // Ensure it's not exactly zero
			}

			const highFluctuation = Math.random() * volatility * 0.5;
			const lowFluctuation = Math.random() * volatility * 0.5;

			let high = parseFloat((Math.max(open, close) * (1 + highFluctuation)).toFixed(2));
			let low = parseFloat((Math.min(open, close) * (1 - lowFluctuation)).toFixed(2));

			// Ensure low is positive and less than high
			if (low <= 0) {
				low = Math.min(open, close) * 0.9; // Adjust if low becomes non-positive
				if (low <= 0) low = 0.01; // Ensure positive low
			}
			if (low >= high) {
				// Ensure low is strictly less than high
				low = high * 0.98;
				if (low <= 0) low = 0.01;
			}
			low = parseFloat(low.toFixed(2));

			const volume = Math.floor(Math.random() * 5000000) + 1000000; // Random volume between 1M and 6M

			data.push({
				date: new Date(currentDate),
				open: open,
				high: high,
				low: low,
				close: close,
				volume: volume
			});

			lastClose = close;
			currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
		}

		console.log(data);
		return data;
	}

	// Generate random stock data (60 days starting from Jan 1, 2023)
	const aapl = generateStockData({
		count: 3500,
		startDate: new Date('2006-01-01'),
		basePrice: 1000000,
		volatility: 0.095
	});

	const goog = generateStockData({
		count: 3500,
		startDate: new Date('2006-01-01'),
		basePrice: 40,
		volatility: 0.095
	});

	const fuuck = generateStockData({
		count: 3500,
		startDate: new Date('2006-01-01'),
		basePrice: 40,
		volatility: 0.095
	});

	// mix both objects
	const combined = { aapl: aapl, goog: goog, fuuck: fuuck };
</script>

<div class="chart-container">
	<h2>Fake stonks</h2>

	<Chart.Root data={combined} margin={{ left: 80, top: 30, right: 30, bottom: 70 }}>
		<Chart.Line series="aapl" x="date" y="close" />
		<Chart.Axes.X />
		<Chart.Axes.Y />
		<Chart.Layers.Grid axis="vertical" />
	</Chart.Root>
</div>

<style>
	.chart-container {
		margin: 2rem auto;
		max-width: 800px;
	}

	h2 {
		margin-bottom: 0.3rem;
		font-size: 1rem;
		font-family: var(--font-title);
	}

	p {
		margin-top: 0;
		color: #666;
		margin-bottom: 1.5rem;
	}
</style>
