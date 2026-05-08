<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	let { 
		title = "Section Title", 
		content = "Content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
		image = "/images/placeholder.png", 
		imagePosition = "left",
		ctaText = "",
		ctaLink = "#"
	} = $props();
</script>

<section class="py-20 lg:py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div class="relative aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-xl {imagePosition === 'right' ? 'lg:order-last' : ''}">
				<img 
					src={image} 
					alt={title} 
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="flex flex-col gap-6">
				<h2 class="text-3xl font-bold tracking-tight md:text-4xl">
					{title}
				</h2>
				<div class="text-lg text-muted-foreground leading-relaxed space-y-4">
					{@html content}
				</div>
				{#if ctaText}
					<div class="pt-4">
						<Button variant="outline" class="rounded-full px-8" href={ctaLink}>
							{ctaText}
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
