<script lang="ts">
	const { data, form } = $props();
	import { enhance } from '$app/forms';

	let uploading = $state(false);
</script>

<h1>Welcome to Soar</h1>
<p>There will be a file sharing service here, at some point</p>

<form
	action="?/upload"
	method="post"
	enctype="multipart/form-data"
	use:enhance={() => {
		uploading = true;

		return async ({ update }) => {
			await update();
			uploading = false;
		};
	}}
>
	<input type="file" name="file" />

	<div>
		{#if uploading}
			uploading...
		{:else if form?.key}
			<a href="/{form.key}">success! link to uploaded file</a>
		{:else if form?.error}
			<span>An error occured: {form.message}</span>
		{/if}
	</div>

	<button type="submit"> submit </button>
</form>
