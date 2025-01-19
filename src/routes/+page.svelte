<script lang="ts">
	//import { Chart } from '$lib';
	// or if you're testing outside the project:
	import { Chart } from '../lib/index.js';

	const data = [
		{ x: new Date('2024-01-01'), y: 10 },
		{ x: new Date('2024-02-01'), y: 20 },
		{ x: new Date('2024-03-01'), y: 15 },
		{ x: new Date('2024-04-01'), y: 25 }
	];
</script>

<Chart.Root width={400} height={400} class="border border-black" {data}></Chart.Root>
