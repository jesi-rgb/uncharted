import { bin, randomNormal } from "d3";

/**
 * Represents a data point for a bar chart
 */
export interface BarDataPoint {
	category: string | number;
	value: number;
	[key: string]: any; // Allow for additional properties
}

/**
 * Options for generating bar chart data
 */
export interface BarDataOptions {
	/** Number of categories/bars to generate */
	categories?: number;
	/** Minimum value for bars */
	minValue?: number;
	/** Maximum value for bars */
	maxValue?: number;
	/** Distribution pattern for the data */
	distribution?: 'uniform' | 'normal' | 'pareto' | 'grouped';
	/** Custom category names (if not provided, will use "Category 1", "Category 2", etc.) */
	categoryNames?: string[];
	/** Number of groups for grouped distribution (only used with 'grouped' distribution) */
	groups?: number;
	/** Custom category key name (defaults to 'category') */
	categoryKey?: string;
	/** Custom value key name (defaults to 'value') */
	valueKey?: string;
	/** Whether to sort the data (ascending or descending) */
	sort?: 'none' | 'ascending' | 'descending';
}

/**
 * Generates random data suitable for bar charts
 * 
 * @param options Configuration options for data generation
 * @returns Array of data points for bar chart visualization
 */
export function generateBarData(options: BarDataOptions = {}): BarDataPoint[] {
	const {
		categories = 10,
		minValue = 0,
		maxValue = 100,
		distribution,
		categoryNames,
		groups,
		categoryKey = 'category',
		valueKey = 'value',
		sort = 'none'
	} = options;

	const result: BarDataPoint[] = [];
	const range = maxValue - minValue;

	// For Pareto distribution, we'll generate all values first and sort them
	let values: number[] = [];

	if (distribution === 'pareto') {
		// Generate Pareto values in ascending order
		const alpha = 1.5; // Shape parameter

		// Generate evenly spaced points in (0,1) for more controlled distribution
		for (let i = 0; i < categories; i++) {
			// Use evenly spaced u values to ensure good distribution
			// Avoid u=0 (which would give infinity) and u=1 (which would give minimum)
			const u = (i + 0.5) / categories;

			// Pareto formula: x_min * (1-u)^(-1/alpha)
			const paretoRaw = Math.pow(1 - u, -1 / alpha);
			// Map to our range - paretoRaw typically ranges from 1 to very large numbers
			const paretoNormalized = Math.min(paretoRaw, 10) / 10;
			const value = Math.round(minValue + paretoNormalized * range);

			// Ensure value stays within bounds
			values.push(Math.max(minValue, Math.min(maxValue, value)));
		}

		// Sort in ascending order
		values.sort((a, b) => a - b);
	}

	if (distribution == 'normal') {

		// Generate random age data with a normal distribution
		// Mean age of 40, standard deviation of 15
		const ageGenerator = randomNormal(60, 15);

		// Generate 10,000 random age data points
		const rawAgeData = Array.from({ length: 1900 }, () => {
			// Ensure ages are between 0 and 100
			return Math.min(100, Math.max(0, Math.round(ageGenerator())));
		});

		// Create histogram bins for the age data
		// Define age brackets with 10-year intervals
		const ageBinGenerator = bin()
			.domain([0, 100])
			.thresholds([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);

		// Generate the histogram data
		const ageBins = ageBinGenerator(rawAgeData);

		// Format the data for the chart
		return ageBins.map((bin) => {
			const minAge = Math.round(bin.x0);
			const maxAge = Math.round(bin.x1);
			return {
				value: bin.length,
				count: bin.length,
				percentage: Math.round((bin.length / rawAgeData.length) * 100),
				category: `${minAge}-${maxAge}`,
				averageAge:
					bin.length > 0 ? Math.round(bin.reduce((sum, age) => sum + age, 0) / bin.length) : 0
			};
		});
	}

	// Generate values based on the selected distribution
	for (let i = 0; i < categories; i++) {
		let value: number;

		if (distribution === 'pareto') {
			// Use pre-generated and sorted values
			value = values[i];
		} else {
			switch (distribution) {

				case 'grouped':
					// Grouped pattern - values cluster around certain points
					const groupIndex = i % groups;
					const groupCenter = minValue + (range / groups) * (groupIndex + 0.5);
					const deviation = range / groups * 0.3; // 30% of group range
					value = Math.round(groupCenter + (Math.random() * 2 - 1) * deviation);
					break;

				case 'uniform':
				default:
					// Uniform distribution (completely random within range)
					value = Math.round(minValue + Math.random() * range);
					break;
			}

		}

		// Determine category name
		let category: string | number;
		if (categoryNames && i < categoryNames.length) {
			category = categoryNames[i];
		} else {
			category = String.fromCharCode(i + 30)
		}

		// Create data point with custom keys
		const dataPoint: BarDataPoint = {
			[categoryKey]: category,
			[valueKey]: value
		};

		result.push(dataPoint);
	}

	return result;
}

/**
 * Generates data for a stacked or grouped bar chart
 * 
 * @param seriesCount Number of data series to generate
 * @param options Configuration options for data generation
 * @returns Object with categories and series data
 */
export function generateMultiBarData(
	seriesCount: number = 3,
	options: BarDataOptions = {}
): {
	categories: string[];
	series: { name: string; data: number[] }[]
} {
	const {
		categories = 6,
		minValue = 0,
		maxValue = 100,
		categoryNames,
		distribution = 'uniform'
	} = options;

	// Generate or use provided category names
	const finalCategoryNames: string[] = [];
	for (let i = 0; i < categories; i++) {
		if (categoryNames && i < categoryNames.length) {
			finalCategoryNames.push(categoryNames[i]);
		} else {
			finalCategoryNames.push(`Category ${i + 1}`);
		}
	}

	// Generate series data
	const series: { name: string; data: number[] }[] = [];

	for (let s = 0; s < seriesCount; s++) {
		// Slightly adjust min/max for each series to create variation
		const seriesMin = minValue + (s * 5);
		const seriesMax = maxValue - ((seriesCount - s) * 5);
		const seriesRange = seriesMax - seriesMin;

		// For Pareto, pre-generate and sort values
		let seriesData: number[] = [];

		if (distribution === 'pareto') {
			// Generate Pareto values in ascending order
			const alpha = 1.5; // Shape parameter

			// Generate evenly spaced points for more controlled distribution
			for (let i = 0; i < categories; i++) {
				// Use evenly spaced u values to ensure good distribution
				// Avoid u=0 (which would give infinity) and u=1 (which would give minimum)
				const u = (i + 0.5) / categories;

				// Pareto formula with controlled input
				const paretoRaw = Math.pow(1 - u, -1 / alpha);
				// Map to our range
				const paretoNormalized = Math.min(paretoRaw, 10) / 10;
				const value = Math.round(seriesMin + paretoNormalized * seriesRange);

				// Ensure value stays within bounds
				seriesData.push(Math.max(seriesMin, Math.min(seriesMax, value)));
			}

			// Sort in ascending order
			seriesData.sort((a, b) => a - b);
		} else {
			// For other distributions, generate normally
			for (let i = 0; i < categories; i++) {
				let value: number;

				switch (distribution) {
					case 'normal':
						// Normal distribution (bell curve)
						// Calculate what percentile this index represents in the distribution
						const percentile = (i + 0.5) / categories;

						// Convert percentile to z-score (standard normal value)
						// This approximates the inverse normal CDF
						const p = Math.max(0.001, Math.min(0.999, percentile));
						const a = 8 * (Math.PI - 3) / (3 * Math.PI * (4 - Math.PI));
						const y = Math.log(1 - p * p);
						const z = p > 0.5 ?
							Math.sqrt(-y + Math.sqrt(y * y + a * y)) :
							-Math.sqrt(-y + Math.sqrt(y * y + a * y));

						// Scale z-score to our range
						const mean = seriesMin + seriesRange / 2;
						const stdDev = seriesRange / 6; // 6 standard deviations span the range

						value = Math.round(mean + z * stdDev);
						break;

					case 'grouped':
						const groupCenter = seriesMin + (seriesRange / categories) * (i + 0.5);
						const deviation = seriesRange / categories * 0.3;
						value = Math.round(groupCenter + (Math.random() * 2 - 1) * deviation);
						break;

					case 'uniform':
					default:
						value = Math.round(seriesMin + Math.random() * seriesRange);
						break;
				}

				// Ensure value stays within bounds
				value = Math.max(seriesMin, Math.min(seriesMax, value));
				seriesData.push(value);
			}
		}

		series.push({
			name: `Series ${s + 1}`,
			data: seriesData
		});
	}

	return {
		categories: finalCategoryNames,
		series
	};
}

