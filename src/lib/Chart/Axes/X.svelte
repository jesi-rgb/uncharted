<script lang="ts">
	import type { ScaleLinear, ScaleTime } from 'd3';
	import { tickStep } from 'd3-array';
	import { format } from 'd3-format';
	import { timeFormat } from 'd3-time-format';

	interface Props {
		scale: 'linear' | 'time';
		label: string;
		xScale: ScaleLinear<number, number> | ScaleTime<number, number>;
	}

	let { scale, label, xScale } = $props() as Props;

	let ticks = $derived(() => {
		const [start, end] = xScale.domain();
		const step = tickStep(start, end, 10);
		return xScale.ticks(10).map((t) => ({
			value: t,
			x: xScale(t),
			label: scale === 'time' ? timeFormat('%Y-%m-%d')(t) : format('.2s')(t)
		}));
	});
</script>

<g>
	{#each ticks as tick}
		<line x1={tick.x} x2={tick.x} y1="0" y2="-5" stroke="currentColor" />
		<text x={tick.x} y="-10" text-anchor="middle" dominant-baseline="hanging">
			{tick.label}
		</text>
	{/each}
	<text x="50%" y="30" text-anchor="middle" dominant-baseline="hanging">
		{label}
	</text>
</g>
