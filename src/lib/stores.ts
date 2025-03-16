import { writable } from "svelte/store";
import type { Scale, ScaleType } from "./types.js"

export const chartStore = writable({});

type AxisData = {
	key: string;
	type: ScaleType;
	scale: Scale<'number'>
}

type XAxesStoreType = Record<string, AxisData>;
export const xAxesStore = writable<XAxesStoreType>({});

type YAxesStoreType = Record<string, AxisData>;
export const yAxesStore = writable<YAxesStoreType>({});
