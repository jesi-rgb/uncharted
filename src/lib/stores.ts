import { writable } from "svelte/store";
import type { Scale, ScaleType } from "./types.js"

export const chartStore = writable({});

type xAxesStoreType = { xKey: string; xType: ScaleType; xScale: Scale<'number'> }
export const xAxesStore = writable<xAxesStoreType>();

type yAxesStoreType = { yKey: string; yType: ScaleType; yScale: Scale<'number'> }
export const yAxesStore = writable<yAxesStoreType>();
