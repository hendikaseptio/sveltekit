<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	let { 
		title = "Judul Section", 
		subtitle = "Deskripsi singkat di sini.",
		ctaText = "",
		ctaLink = "#",
		align = "center"
	} = $props();
</script>

<section class="py-16 lg:py-20 bg-muted/40 border-y border-border/50">
	<div class="container mx-auto px-4 md:px-6">
		<div class="max-w-3xl {align === 'center' ? 'mx-auto text-center' : align === 'right' ? 'ml-auto text-right' : 'text-left'}">
			<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-4">
				{title}
			</h2>
			<p class="text-lg text-muted-foreground leading-relaxed mb-6">
				{subtitle}
			</p>
			{#if ctaText}
				<Button size="lg" class="rounded-full px-8" href={ctaLink}>
					{ctaText}
				</Button>
			{/if}
		</div>
	</div>
</section>
