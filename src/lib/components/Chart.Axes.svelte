<!-- Chart.Axes.svelte -->
<script lang="ts">
	let { children, ...other } = $props<{
		children?: import('svelte').Snippet;
	}>();
</script>

<g {...other}>
	{@render children?.()}
</g>
