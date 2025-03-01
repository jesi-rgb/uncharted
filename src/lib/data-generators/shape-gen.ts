/**
 * Represents a data point for a line chart
 */
export interface LineDataPoint {
	x: number | string;
	y: number;
	[key: string]: any; // Allow for additional properties
}

/**
 * Options for generating line chart data
 */
export interface LineDataOptions {
	/** Number of data points to generate */
	points?: number;
	/** Minimum value for y-axis */
	minY?: number;
	/** Maximum value for y-axis */
	maxY?: number;
	/** Whether to use dates for x-axis instead of numbers */
	useDates?: boolean;
	/** Start date if using dates (defaults to current date minus points days) */
	startDate?: Date;
	/** Pattern type for data generation */
	pattern?: 'random' | 'trend' | 'sine' | 'steps';
	/** Noise level (0-1) to add variation to patterns */
	noise?: number;
	/** Custom x-axis key name (defaults to 'x') */
	xKey?: string;
	/** Custom y-axis key name (defaults to 'y') */
	yKey?: string;
}

/**
 * Generates random but coherent data suitable for line charts
 * 
 * @param options Configuration options for data generation
 * @returns Array of data points for line chart visualization
 */
export function generateLineData(options: LineDataOptions = {}): LineDataPoint[] {
	const {
		points = 100,
		minY = 0,
		maxY = 100,
		useDates = false,
		pattern = 'random',
		noise = 0.2,
		xKey = 'x',
		yKey = 'y'
	} = options;

	const result: LineDataPoint[] = [];
	const range = maxY - minY;

	// Initialize starting value in the middle of the range
	let currentValue = minY + range / 2;

	// Create start date if using dates
	const startDate = options.startDate || new Date();
	if (useDates && !options.startDate) {
		startDate.setDate(startDate.getDate() - points + 1); // Start from (points) days ago
	}

	for (let i = 0; i < points; i++) {
		// Generate x value based on configuration
		let xValue: number | string = i;
		if (useDates) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			xValue = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
		}

		// Calculate base y value based on selected pattern
		let baseValue: number;

		switch (pattern) {
			case 'trend':
				// Linear trend (upward or downward)
				const trendDirection = Math.random() > 0.5 ? 1 : -1;
				baseValue = minY + (range * (i / points)) * trendDirection;
				break;

			case 'sine':
				// Sine wave pattern
				baseValue = minY + (range / 2) + Math.sin((i / points) * Math.PI * 2) * (range / 2);
				break;

			case 'steps':
				// Step pattern (plateaus with occasional jumps)
				if (i === 0) {
					baseValue = currentValue;
				} else if (i % Math.floor(points / 5) === 0) {
					// Create a step every ~20% of points
					const stepChange = (Math.random() * 2 - 1) * (range / 3);
					currentValue = Math.max(minY, Math.min(maxY, currentValue + stepChange));
					baseValue = currentValue;
				} else {
					baseValue = currentValue;
				}
				break;

			case 'random':
			default:
				// Random walk (each point influenced by previous)
				const maxChange = range * 0.05; // Max 5% change between points
				const change = (Math.random() * 2 - 1) * maxChange;
				currentValue = Math.max(minY, Math.min(maxY, currentValue + change));
				baseValue = currentValue;
				break;
		}

		// Add noise to the base value
		const noiseAmount = (Math.random() * 2 - 1) * noise * (range * 0.1);
		let finalValue = Math.round(baseValue + noiseAmount);

		// Ensure value stays within bounds
		finalValue = Math.max(minY, Math.min(maxY, finalValue));

		// Create data point with custom keys
		const dataPoint: LineDataPoint = {
			[xKey]: xValue,
			[yKey]: finalValue
		};

		result.push(dataPoint);
	}

	return result;
}

/**
 * Generates multiple series of line data for multi-line charts
 * 
 * @param seriesCount Number of data series to generate
 * @param options Configuration options for data generation
 * @returns Array of data series, each containing data points
 */
export function generateMultiLineData(
	seriesCount: number = 3,
	options: LineDataOptions = {}
): { name: string; data: LineDataPoint[] }[] {
	const series = [];

	for (let i = 0; i < seriesCount; i++) {
		// Slightly vary the options for each series to create distinct lines
		const seriesOptions = {
			...options,
			// Adjust the min/max slightly for each series
			minY: options.minY !== undefined ? options.minY + (i * 5) : undefined,
			maxY: options.maxY !== undefined ? options.maxY - (i * 3) : undefined,
			// Vary the pattern if not specified
			pattern: options.pattern || ['random', 'trend', 'sine', 'steps'][i % 4]
		};

		series.push({
			name: `Series ${i + 1}`,
			data: generateLineData(seriesOptions)
		});
	}

	return series;
}


