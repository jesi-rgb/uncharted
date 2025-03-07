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

/**
 * Options for generating time series data
 */
export interface TimeSeriesDataOptions {
	/** Number of data points to generate */
	count?: number;
	/** Start date for the time range */
	startDate?: Date;
	/** End date for the time range */
	endDate?: Date;
	/** Number of unique items to generate (max 10) */
	uniqueItems?: number;
	/** Minimum value for the data points */
	minValue?: number;
	/** Maximum value for the data points */
	maxValue?: number;
	/** Whether to sort the data by time */
	sortByTime?: boolean;
	/** Custom item names (if not provided, will use "Item 1", "Item 2", etc.) */
	itemNames?: string[];
	/** Custom time key name (defaults to 'time') */
	timeKey?: string;
	/** Custom item key name (defaults to 'item') */
	itemKey?: string;
	/** Custom value key name (defaults to 'value') */
	valueKey?: string;
	/** Distribution pattern for the values */
	distribution?: 'uniform' | 'normal' | 'trend' | 'seasonal';
}

/**
 * Represents a data point for time series data
 */
export interface TimeSeriesDataPoint {
	time: Date;
	item: string;
	value: number;
	[key: string]: any; // Allow for additional properties
}

/**
 * Generates random time series data with items that can be grouped
 * 
 * @param options Configuration options for data generation
 * @returns Array of data points with time, item, and value properties
 */
export function generateTimeSeriesData(options: TimeSeriesDataOptions = {}): TimeSeriesDataPoint[] {
	const {
		count = 100,
		startDate = new Date(new Date().getFullYear() - 1, 0, 1), // Default to 1 year ago
		endDate = new Date(),
		uniqueItems = 5,
		minValue = 10,
		maxValue = 100,
		sortByTime = true,
		itemNames,
		timeKey = 'time',
		itemKey = 'item',
		valueKey = 'value',
		distribution = 'uniform'
	} = options;

	// Ensure uniqueItems is not more than 10
	const finalUniqueItems = Math.min(uniqueItems, 10);

	// Generate or use provided item names
	const finalItemNames: string[] = [];
	for (let i = 0; i < finalUniqueItems; i++) {
		if (itemNames && i < itemNames.length) {
			finalItemNames.push(itemNames[i]);
		} else {
			finalItemNames.push(`Item ${i + 1}`);
		}
	}

	// Calculate time range in milliseconds
	const timeRange = endDate.getTime() - startDate.getTime();

	// For trend and seasonal distributions, prepare base values for each item
	const itemBaseValues: Record<string, number> = {};
	const itemTrends: Record<string, number> = {};
	const seasonalPeriod = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

	finalItemNames.forEach(item => {
		// Random base value for each item
		itemBaseValues[item] = minValue + Math.random() * (maxValue - minValue) * 0.5;

		// Random trend direction and strength for each item
		itemTrends[item] = (Math.random() * 2 - 1) * (maxValue - minValue) * 0.5 / timeRange;
	});

	const result: TimeSeriesDataPoint[] = [];

	for (let i = 0; i < count; i++) {
		// Generate random time within the range
		const randomTime = new Date(startDate.getTime() + Math.random() * timeRange);

		// Select a random item from the list
		const item = finalItemNames[Math.floor(Math.random() * finalUniqueItems)];

		// Generate value based on the selected distribution
		let value: number;

		switch (distribution) {
			case 'normal':
				// Normal distribution around the middle of the range
				const mean = (minValue + maxValue) / 2;
				const stdDev = (maxValue - minValue) / 6; // 6 standard deviations span the range

				// Box-Muller transform for normal distribution
				const u1 = Math.random();
				const u2 = Math.random();
				const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

				value = Math.round(mean + z * stdDev);
				break;

			case 'trend':
				// Linear trend over time
				const timeProgress = (randomTime.getTime() - startDate.getTime()) / timeRange;
				const baseValue = itemBaseValues[item];
				const trendValue = itemTrends[item] * (randomTime.getTime() - startDate.getTime());

				value = Math.round(baseValue + trendValue);
				break;

			case 'seasonal':
				// Seasonal pattern (sinusoidal)
				const baseValue2 = itemBaseValues[item];
				const timePosition = randomTime.getTime() - startDate.getTime();

				// Seasonal component (sine wave)
				const seasonalAmplitude = (maxValue - minValue) * 0.3;
				const seasonalComponent = Math.sin(2 * Math.PI * timePosition / seasonalPeriod) * seasonalAmplitude;

				// Optional trend component
				const trendComponent = itemTrends[item] * timePosition;

				value = Math.round(baseValue2 + seasonalComponent + trendComponent);
				break;

			case 'uniform':
			default:
				// Uniform distribution
				value = Math.round(minValue + Math.random() * (maxValue - minValue));
				break;
		}

		// Ensure value stays within bounds
		value = Math.max(minValue, Math.min(maxValue, value));

		// Create data point with custom keys
		const dataPoint: TimeSeriesDataPoint = {
			[timeKey]: randomTime,
			[itemKey]: item,
			[valueKey]: value,
			time: randomTime,
			item: item,
			value: value
		};

		result.push(dataPoint);
	}

	// Sort by time if requested
	if (sortByTime) {
		result.sort((a, b) => a.time.getTime() - b.time.getTime());
	}

	return result;
}

