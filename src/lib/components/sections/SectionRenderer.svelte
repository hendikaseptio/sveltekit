<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import HeroSecondarySection from './HeroSecondarySection.svelte';
	import ImageTextSection from './ImageTextSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import FAQSection from './FAQSection.svelte';
	import CTASection from './CTASection.svelte';
	import PostsSection from './PostsSection.svelte';

	interface Section {
		type: string;
		props: any;
	}

	let { section, latestPosts = [] }: { section: Section; latestPosts?: any[] } = $props();

	const map: Record<string, any> = {
		'hero':            HeroSection,
		'hero-secondary':  HeroSecondarySection,
		'image-text':      ImageTextSection,
		'contact':         ContactSection,
		'faq':             FAQSection,
		'cta':             CTASection,
		'posts':           PostsSection
	};

	const Component = $derived(map[section.type]);
</script>

{#if Component}
	{#if section.type === 'posts'}
		<Component {...section.props} {latestPosts} />
	{:else}
		<Component {...section.props} />
	{/if}
{:else}
	<div class="p-8 border-2 border-dashed border-destructive/20 text-destructive text-center rounded-xl">
		Unknown section type: <code>{section.type}</code>
	</div>
{/if}
