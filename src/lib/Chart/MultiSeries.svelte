<script lang="ts">
	import { multiSeriesContext } from '$lib/context.js';
	import { chartStore } from '$lib/stores.js';

	const { children, keys } = $props();

	const { data } = $derived($chartStore);
</script>

<g id="multi-series">
	{@render children()}
</g>
