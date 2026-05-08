<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArrowRight } from "lucide-svelte";

	let { 
		title = "Hero Title", 
		subtitle = "Hero Subtitle goes here...", 
		ctaText = "Get Started", 
		ctaLink = "#",
		image = "/images/hero.png"
	} = $props();
</script>

<section class="relative overflow-hidden bg-background py-20 lg:py-32">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div class="flex flex-col gap-6 text-center lg:text-left">
				<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-balance">
					{title}
				</h1>
				<p class="text-lg text-muted-foreground md:text-xl text-pretty">
					{subtitle}
				</p>
				<div class="flex flex-wrap justify-center lg:justify-start gap-4">
					<Button size="lg" class="rounded-full px-8" href={ctaLink}>
						{ctaText} <ArrowRight class="ml-2" size={18} />
					</Button>
				</div>
			</div>
			<div class="relative aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-2xl lg:aspect-square">
				<img 
					src={image} 
					alt="Hero" 
					class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
				/>
			</div>
		</div>
	</div>
</section>
