import Root from './Root.svelte';
import AxesContainer from './Axes.svelte';
import X from './Axes/X.svelte';
import Y from './Axes/Y.svelte';
import Series from './Series.svelte';
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
	Series: {
		Area, Bar, Line
	},
	Layers: {
		Grid
	}
};
