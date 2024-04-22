<script lang="ts">
	import { page } from '$app/stores';
	const { data } = $props();

	const embedType = data.metadata.ContentType?.split('/')[0];
</script>

{#if embedType == 'image'}
	<img class="block" src={data.presignedURL} alt="some random user uploaded that does not come with alt text" />
{:else if embedType == 'video'}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video class="block" src={data.presignedURL}></video>
{/if}

<a href={data.presignedURL}>raw</a>

<style>
	.block {
		display: block;
	}
</style>
