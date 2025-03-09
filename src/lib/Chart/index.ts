import Root from './Root.svelte';
import AxesContainer from './Axes.svelte';
import X from './Axes/X.svelte';
import Y from './Axes/Y.svelte';
import Series from './Series.svelte';
import MultiSeries from './MultiSeries.svelte';
import Area from './Series/Area.svelte';
import Bar from './Series/Bar.svelte';
import Line from './Series/Line.svelte';
import Grid from './Layers/Grid.svelte';

export const Chart = {
	Root,
	AxesContainer,
	Axes: {
		X,
		Y
	},
	Area, Bar, Line,
	MultiSeries,
	Layers: {
		Grid
	}
};
