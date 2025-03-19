import { writable } from "svelte/store";
import type { Scale, ScaleType } from "./types.js"

type ChartData = {
	data: any;
	width: number | undefined;
	height: number;
	margin: { top: number; right: number; bottom: number; left: number };
	id: string;
}

type ChartStoreType = Record<string, ChartData>;
export const chartStore = writable<ChartStoreType>({});

type AxisData = {
	key: string;
	type: ScaleType;
	scale: Scale<'number'>
}

type XAxesStoreType = Record<string, AxisData>;
export const xAxesStore = writable<XAxesStoreType>({});

type YAxesStoreType = Record<string, AxisData>;
export const yAxesStore = writable<YAxesStoreType>({});
