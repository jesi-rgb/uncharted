<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="mx-auto my-20 w-[95%] max-w-6xl">
	{@render children()}
</main>
