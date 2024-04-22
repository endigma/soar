<script lang="ts">
	const { form } = $props();
	import { enhance } from '$app/forms';

	let loading = $state(false);
</script>

<h1>Welcome to Soar</h1>

<form
	action="?/upload"
	method="post"
	enctype="multipart/form-data"
	use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<input type="file" name="file" />

	<div>
		{#if loading}
			uploading...
		{:else if form?.error}
			<span>An error occured: {form.message}</span>
		{/if}
	</div>

	<button disabled={loading} type="submit"> submit </button>
</form>
