<script lang="ts">
	const { data } = $props();

	const embedType = data.metadata.ContentType?.split('/')[0];
</script>

{#if embedType == 'image'}
	<!-- svelte-ignore a11y-missing-attribute -->
	<img class="block" src={data.url} />
{:else if embedType == 'video'}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video class="block" src={data.url}></video>
{/if}

<a href={data.url}>raw</a>

<style>
	.block {
		display: block;
	}
</style>
