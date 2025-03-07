<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		/* this will only affect <p> elements in this component */
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;
		margin-bottom: 5rem;
		max-width: 800px;
	}
</style>
