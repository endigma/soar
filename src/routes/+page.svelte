<script lang="ts">
	const { data } = $props()
</script>

<h1>Welcome to Soar</h1>
<p>There will be a file sharing service here, at some point</p>


{#if data.Contents}
	{#each data.Contents as file}
		<pre>{JSON.stringify(file, undefined, 2)}</pre>
		<a href="/{file.Key}">view</a>
		<a href="/raw/{file.Key}">raw</a>
	{/each}
{/if}
