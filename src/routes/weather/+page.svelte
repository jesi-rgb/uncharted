<script lang="ts">
	import { Chart } from '$lib/index.js';

	import { onMount } from 'svelte';

	let hourlyData: any | null = $state(null);
	let loading = $state(false);
	let error = $state<string | null>(null);

	async function getHourlyData() {
		loading = true;
		error = null;

		try {
			const response = await fetch('/api/hourly');

			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}

			const data = await response.json();

			// Convert string values to numbers and format periodo as datetime
			data.forEach((item: any) => {
				item.prediccion.dia.forEach((day: any) => {
					if (day.precipitacion) {
						day.precipitacion = day.precipitacion.map((precip: any) => {
							// Parse the periodo as an hour
							const hour = parseInt(precip.periodo, 10);

							// Create a new Date object from the day's fecha
							const dateTime = new Date(day.fecha);

							// Set the hour from periodo
							dateTime.setHours(hour, 0, 0, 0);

							return {
								...precip,
								periodo: parseInt(precip.periodo, 10),
								value: parseFloat(precip.value),
								dateTime: dateTime // Add the formatted datetime
							};
						});
					}
				});
			});

			return data;
		} catch (err) {
			console.error('Error fetching weather data:', err);
			error = err instanceof Error ? err.message : 'Unknown error occurred';
			throw err;
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		try {
			hourlyData = await getHourlyData();
		} catch (err) {
			console.error('Failed to load data on mount:', err);
		}
	});
</script>

<h1>Córdoba</h1>

{#if loading}
	<p>Loading weather data...</p>
{:else if error}
	<p class="text-red-500">Error: {error}</p>
{/if}

{#if hourlyData != null && typeof hourlyData === 'object'}
	{#each hourlyData[0].prediccion.dia as day}
		<h2 class="font-bold">{new Date(day.fecha).toDateString()}</h2>

		<Chart.Root
			height={200}
			data={day.precipitacion}
			margin={{ left: 50, top: 30, right: 30, bottom: 30 }}
		>
			<Chart.Bar x="dateTime" y="value" barWidth={10} />
			<Chart.Axes.Y />
			<Chart.Axes.X />
			<Chart.Layers.Grid />
		</Chart.Root>

		<div class="my-10">
			{#each day.precipitacion as rainData}
				<div class="my-5 flex gap-3 tabular-nums">
					<div>
						{rainData.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</div>
					<div>{rainData.value} mm</div>
				</div>
			{/each}
		</div>
	{/each}
{/if}
