<script lang="ts">
	import { page } from '$app/stores';
	const { data } = $props();

	const embedType = data.ContentType?.split('/')[0];

	const src = '/raw/' + $page.params.file;
</script>

{#if embedType == 'image'}
	<img class="block" {src} alt="some random user uploaded that does not come with alt text" />
{:else if embedType == 'video'}
	<video class="block" {src}></video>
{/if}

<a href={src}>raw</a>

<style>
	.block {
		display: block;
	}
</style>
