<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArrowRight } from "lucide-svelte";

	let {
		title = "Siap Memulai?",
		subtitle = "Bergabunglah dengan ribuan pengguna yang telah merasakan manfaatnya.",
		ctaText = "Mulai Sekarang",
		ctaLink = "#",
		ctaSecondaryText = "",
		ctaSecondaryLink = "#",
		variant = "gradient" // gradient | dark | light
	} = $props();

	const variants: Record<string, string> = {
		gradient: "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground",
		dark:     "bg-foreground text-background",
		light:    "bg-muted text-foreground"
	};

	const bgClass = $derived(variants[variant] ?? variants.gradient);
</script>

<section class="py-20 lg:py-28 {bgClass}">
	<div class="container mx-auto px-4 md:px-6 text-center">
		<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-5 max-w-3xl mx-auto">
			{title}
		</h2>
		<p class="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
			{subtitle}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			{#if ctaText}
				<Button
					href={ctaLink}
					size="lg"
					variant={variant === 'light' ? 'default' : 'secondary'}
					class="rounded-full px-8 gap-2 text-base font-semibold"
				>
					{ctaText}
					<ArrowRight size={18} />
				</Button>
			{/if}
			{#if ctaSecondaryText}
				<Button
					href={ctaSecondaryLink}
					size="lg"
					variant="outline"
					class="rounded-full px-8 text-base font-semibold {variant !== 'light' ? 'border-white/40 text-inherit hover:bg-white/10' : ''}"
				>
					{ctaSecondaryText}
				</Button>
			{/if}
		</div>
	</div>
</section>
