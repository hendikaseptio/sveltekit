<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import ImageTextSection from './ImageTextSection.svelte';

	interface Section {
		type: string;
		props: any;
	}

	let { section }: { section: Section } = $props();

	const map: Record<string, any> = {
		'hero': HeroSection,
		'image-text': ImageTextSection
	};

	const Component = $derived(map[section.type]);
</script>

{#if Component}
	<Component {...section.props} />
{:else}
	<div class="p-8 border-2 border-dashed border-destructive/20 text-destructive text-center rounded-xl">
		Unknown section type: {section.type}
	</div>
{/if}
