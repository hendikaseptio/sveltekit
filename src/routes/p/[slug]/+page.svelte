<script lang="ts">
	import SectionRenderer from '$lib/components/sections/SectionRenderer.svelte';
	import SEO from "$lib/components/SEO.svelte";

	let { data } = $props();
	const sections = $derived(data.page.sections ? JSON.parse(data.page.sections) : []);
</script>

<SEO 
	title={data.page.title} 
	description={data.page.content.substring(0, 160).replace(/<[^>]*>/g, '') || "Lihat halaman ini di website kami."}
/>

<div class="min-h-screen pb-20">
	{#each sections as section (section.id)}
		<SectionRenderer {section} latestPosts={data.latestPosts ?? []} />
	{:else}
		<div class="container mx-auto px-4 py-20">
			<h1 class="mb-8 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
				{data.page.title}
			</h1>
			<div class="prose prose-lg mx-auto dark:prose-invert">
				{@html data.page.content}
			</div>
		</div>
	{/each}
</div>
