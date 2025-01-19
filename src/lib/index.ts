// src/lib/index.ts
import Root from './components/Chart.Root.svelte';
import Axes from './components/Chart.Axes.svelte';
import AxesX from './components/Chart.Axes.X.svelte';
import AxesY from './components/Chart.Axes.Y.svelte';

export const Chart = {
	Root,
	Axes: {
		...Axes,
		X: AxesX,
		Y: AxesY
	}
};

// Also export types if needed
export type * from './types.js';
