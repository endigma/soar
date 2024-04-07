<script lang="ts">
	import { page } from "$app/stores"
	const { data } = $props()

	const embedType = data.ContentType?.split("/")[0]

	const src = "/raw/" + $page.params.file

// 	application
// audio
// font
// example
// image
// message
// model
// multipart
// text
// video
</script>

<pre>{JSON.stringify(data, undefined, 2)}</pre>
<pre>{JSON.stringify(embedType, undefined, 2)}</pre>

{#if embedType == "image"}
<img {src} width=300>
{:else if embedType == "video"}
<video {src} width=300></video>
{:else}
	<a href={src}>raw</a>
{/if}
