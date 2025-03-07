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
		const result = [];
		let currentPrice = basePrice;

		for (let i = 0; i < count; i++) {
			// Create date for this entry (weekdays only)
			const currentDate = new Date(startDate);
			currentDate.setDate(startDate.getDate() + i);

			// Skip weekends
			const day = currentDate.getDay();
			if (day === 0 || day === 6) {
				count++; // Add an extra day to compensate
				continue;
			}

			// Generate random price movement (random walk with drift)
			const changePercent = (Math.random() - 0.5) * volatility * 2;
			const priceChange = currentPrice * changePercent;

			// Calculate daily values
			const open = currentPrice;
			const close = currentPrice + priceChange;

			// Determine high and low (random within reasonable range)
			const highExtra = Math.random() * Math.abs(priceChange) * 0.5;
			const lowExtra = Math.random() * Math.abs(priceChange) * 0.5;

			const high = Math.max(open, close) + highExtra;
			const low = Math.min(open, close) - lowExtra;

			// Random volume between 1M and 20M
			const volume = Math.floor(1000000 + Math.random() * 19000000);

			// Add data point
			result.push({
				Date: new Date(currentDate),
				Open: parseFloat(open.toFixed(6)),
				High: parseFloat(high.toFixed(6)),
				Low: parseFloat(low.toFixed(6)),
				Close: parseFloat(close.toFixed(6)),
				Volume: volume
			});

			// Update current price for next iteration
			currentPrice = close;
		}

		return result;
	}

	// Generate random stock data (60 days starting from Jan 1, 2023)
	const aapl = generateStockData({
		count: 3500,
		startDate: new Date('2006-01-01'),
		basePrice: 10,
		volatility: 0.015
	});
</script>

<div class="chart-container">
	<h2>Time-based Histogram</h2>
	<p>Count of items per time period</p>

	<Chart.Root data={aapl} margin={{ left: 50, top: 30, right: 30, bottom: 70 }}>
		<Chart.AxesContainer x="Date" y="Close">
			<Chart.Axes.Y />
			<Chart.Axes.X />

			<Chart.Series.Line stroke-width={0.5} />
		</Chart.AxesContainer>
	</Chart.Root>
</div>

<style>
	.chart-container {
		margin: 2rem auto;
		max-width: 800px;
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	p {
		margin-top: 0;
		color: #666;
		margin-bottom: 1.5rem;
	}
</style>
