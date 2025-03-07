<script>
	import { page } from '$app/state';
</script>

<div class="title">oops, something went wrong</div>
<p>{page.error?.message}</p>

<style>
	.title {
		font-family: var(--font-title);
	}
</style>
