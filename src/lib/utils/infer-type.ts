import {
	scaleLinear,
	scaleBand,
	scaleTime,
	scaleLog,
	type ScaleLinear,
	type ScaleBand,
	type ScaleTime,
	type ScaleLogarithmic,
	extent,
	type ScaleQuantize,
	scaleQuantize,
	scaleQuantile
} from 'd3';


import type { DataType } from '$lib/types.js';

type ScaleType =
	| ScaleLinear<number, number, any>
	| ScaleBand<string>
	| ScaleTime<number, number> // for time
	| ScaleLogarithmic<number, number, never>;



interface InferredType {
	type: DataType;
	scale: ScaleType;
}

/**
 * Checks if a value is a valid date. 
 * AI SLOP for now will have to suffice
 */
function isValidDate(value: any): boolean {
	// If it's already a Date object, just check if it's valid
	if (value instanceof Date) return !isNaN(value.getTime());

	// If it's a number, it might be a timestamp
	if (typeof value === 'number') {
		const date = new Date(value);
		return !isNaN(date.getTime());
	}

	if (typeof value === 'string') {
		const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:?\d{2})?)?$/;
		const usDateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/(\d{4}|\d{2})$/;
		const euDateRegex = /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/(\d{4}|\d{2})$/;
		const commonDateRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}$/i;

		if (
			isoDateRegex.test(value) ||
			usDateRegex.test(value) ||
			euDateRegex.test(value) ||
			commonDateRegex.test(value)
		) {
			const date = new Date(value);
			return !isNaN(date.getTime());
		}

		if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
			const parts = value.split('-');
			const year = parseInt(parts[0], 10);
			const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
			const day = parseInt(parts[2], 10);

			if (month >= 0 && month < 12 && day > 0 && day <= 31) {
				const date = new Date(year, month, day);
				return date.getFullYear() === year &&
					date.getMonth() === month &&
					date.getDate() === day;
			}
		}

		return false;
	}

	return false;
}

/**
 * Checks if all values in an array are numbers
 */
function allNumbers(values: any[]): boolean {
	return values.every(v => typeof v === 'number' || (typeof v === 'string' && !isNaN(+v)));
}

/**
 * Checks if all values in an array are dates
 */
function allDates(values: any[]): boolean {
	return values.every(v => isValidDate(v));
}

/**
 * Checks if the data might be better represented with a logarithmic scale
 * (has a wide range of values with some very small and some very large)
 */
function shouldUseLogScale(values: number[]): boolean {
	if (values.some(v => v <= 0)) return false; // Log scale can't handle zero or negative values

	const [min, max] = extent(values)

	// If the ratio between max and min is large, a log scale might be appropriate
	return max / min > 1000;
}

/**
 * Infers the data type from an array of data for a specific key and returns an appropriate D3 scale
 * 
 * @param data Array of data objects
 * @param key The key/property to analyze
 * @returns Object containing the inferred data type and an appropriate D3 scale
 */
export function inferType<T>(data: T[], key: keyof T): InferredType {
	if (!data || data.length === 0) {
		// Default to categorical if no data
		return {
			type: 'categorical',
			scale: scaleBand().padding(0.1)
		};
	}

	// Extract values for the specified key
	const values = data.map(d => d[key]).filter(v => v !== undefined && v !== null);

	if (values.length === 0) {
		return {
			type: 'categorical',
			scale: scaleBand().padding(0.1)
		};
	}

	// Check if all values are numbers
	if (allNumbers(values)) {
		const numericValues = values.map(v => +v);

		// Check if a log scale might be more appropriate
		if (shouldUseLogScale(numericValues)) {
			return {
				type: 'logarithmic',
				scale: scaleLog()
			};
		}

		return {
			type: 'number',
			scale: scaleLinear()
		};
	}

	// Check if all values are dates
	if (allDates(values)) {
		return {
			type: 'time',
			scale: scaleTime()
		};
	}

	return {
		type: 'categorical',
		scale: scaleBand()
	};
}

/**
 * Sets the domain for a scale based on the inferred type and data
 * 
 * @param scale The D3 scale to set the domain for
 * @param data Array of data objects
 * @param key The key/property to use for the domain
 * @param type The inferred data type
 * @returns The scale with domain set
 */
export function setDomain<T>(
	scale: ScaleType,
	data: T[],
	key: keyof T,
	type: DataType
): ScaleType {
	const values = data.map(d => d[key]).filter(v => v !== undefined && v !== null);

	if (values.length === 0) return scale;

	switch (type) {
		case 'number':
		case 'logarithmic':
			return (scale as ScaleLinear<number, number>).domain(extent(values));

		case 'time':
			const dateValues = values.map(v => new Date(v as string | number | Date));

			return scale.domain(extent(dateValues));

		case 'categorical':
		case 'text':
			const uniqueValues = Array.from(new Set(values.map(v => String(v))));
			return (scale as ScaleBand<string>).domain(uniqueValues);

		default:
			return scale;
	}
}

/**
 * Sets the range for a scale based on the inferred type and provided dimensions
 * 
 * @param scale The D3 scale to set the range for
 * @param type The inferred data type
 * @param range The range to set (typically [0, width] for x-axis or [height, 0] for y-axis)
 * @param options Additional options for configuring the scale
 * @returns The scale with range set
 */
export function setRange(
	scale: ScaleType,
	type: DataType,
	range: [number, number]
): ScaleType {
	switch (type) {
		case 'number':
		case 'logarithmic':
		case 'time':
			return (scale as ScaleLinear<number, number>).range(range);

		case 'categorical':
		case 'text':
			const bandScale = scale as ScaleBand<string>;

			return bandScale.range(range);

	}
}

/**
 * Infers the type and creates a properly configured scale for a dataset and key
 * 
 * @param data Array of data objects
 * @param key The key/property to analyze
 * @param range Optional range to set for the scale (e.g., [0, width] for x-axis)
 * @param options Optional configuration for the scale (padding, etc.)
 * @returns A properly configured D3 scale with domain and range set
 */
export function createScale<T>(
	data: T[],
	key: keyof T,
	range?: [number, number],
): {
	type: DataType;
	scale: ScaleType;
} {

	const inference = inferType(data, key);
	const scaleWithDomain = setDomain(inference.scale, data, key, inference.type);

	// Set range if provided
	const finalScale = range
		? setRange(scaleWithDomain, inference.type, range)
		: scaleWithDomain;

	return {
		type: inference.type,
		scale: finalScale
	};
}

