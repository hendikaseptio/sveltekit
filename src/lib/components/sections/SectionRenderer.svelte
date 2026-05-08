<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import HeroSecondarySection from './HeroSecondarySection.svelte';
	import ImageTextSection from './ImageTextSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import FAQSection from './FAQSection.svelte';

	interface Section {
		type: string;
		props: any;
	}

	let { section }: { section: Section } = $props();

	const map: Record<string, any> = {
		'hero': HeroSection,
		'hero-secondary': HeroSecondarySection,
		'image-text': ImageTextSection,
		'contact': ContactSection,
		'faq': FAQSection
	};

	const Component = $derived(map[section.type]);
</script>

{#if Component}
	<Component {...section.props} />
{:else}
	<div class="p-8 border-2 border-dashed border-destructive/20 text-destructive text-center rounded-xl">
		Unknown section type: <code>{section.type}</code>
	</div>
{/if}
