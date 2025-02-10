import Root from './Root.svelte';
import Axes from './Axes.svelte';
import X from './Axes/X.svelte';
import Y from './Axes/Y.svelte';
import Series from './Series.svelte';
import Area from './Series/Area.svelte';
import Bar from './Series/Bar.svelte';

export const Chart = {
	Root,
	Axes: {
		Axes,
		X,
		Y
	},
	Series: {
		Series,
		Area, Bar
	}
};
