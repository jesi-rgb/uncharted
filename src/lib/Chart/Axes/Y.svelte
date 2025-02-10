<script lang="ts">
	import type { ScaleLinear } from 'd3';
	import { tickStep } from 'd3-array';
	import { format } from 'd3-format';

	interface Props {
		label: string;
		yScale: ScaleLinear<number, number>;
	}

	let { label, yScale } = $props() as Props;

	let ticks = $derived.by(() => {
		const [start, end] = yScale.domain();
		const step = tickStep(start, end, 10);
		return yScale.ticks(10).map((t) => ({
			value: t,
			y: yScale(t),
			label: format('.2s')(t)
		}));
	});
</script>

<g>
	{#each ticks as tick}
		<line x1="0" x2="5" y1={tick.y} y2={tick.y} stroke="currentColor" />
		<text x="-10" y={tick.y} text-anchor="end" dominant-baseline="middle">
			{tick.label}
		</text>
	{/each}
	<text x="-15" y="50%" text-anchor="middle" dominant-baseline="hanging" transform="rotate(-90)">
		{label}
	</text>
</g>
