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
		distribution = 'uniform',
		categoryNames,
		groups = 3,
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

	// Generate values based on the selected distribution
	for (let i = 0; i < categories; i++) {
		let value: number;

		if (distribution === 'pareto') {
			// Use pre-generated and sorted values
			value = values[i];
		} else {
			switch (distribution) {
				case 'normal':
					// Bell curve distribution (more values in the middle range)
					// Using Box-Muller transform for normal distribution
					const u1 = Math.random();
					const u2 = Math.random();
					const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
					// Scale to our range (z is normally between -3 and 3)
					const normalized = (z + 3) / 6; // Convert to 0-1 range
					value = Math.round(minValue + normalized * range);
					break;

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

			// Ensure value stays within bounds
			value = Math.max(minValue, Math.min(maxValue, value));
		}

		// Determine category name
		let category: string | number;
		if (categoryNames && i < categoryNames.length) {
			category = categoryNames[i];
		} else {
			category = `Category ${i + 1}`;
		}

		// Create data point with custom keys
		const dataPoint: BarDataPoint = {
			[categoryKey]: category,
			[valueKey]: value
		};

		result.push(dataPoint);
	}

	// Sort the data if requested (but not for Pareto which is already sorted)
	if (sort !== 'none' && distribution !== 'pareto') {
		result.sort((a, b) => {
			const aValue = a[valueKey] as number;
			const bValue = b[valueKey] as number;
			return sort === 'ascending' ? aValue - bValue : bValue - aValue;
		});
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
						const u1 = Math.random();
						const u2 = Math.random();
						const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
						const normalized = (z + 3) / 6;
						value = Math.round(seriesMin + normalized * seriesRange);
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

