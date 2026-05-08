<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Calendar, ArrowRight } from "lucide-svelte";

	interface Post {
		id: string;
		title: string;
		slug: string;
		excerpt?: string | null;
		cover?: string | null;
		publishedAt?: Date | string | null;
	}

	let {
		title = "Artikel Terbaru",
		subtitle = "Baca artikel dan wawasan terkini dari kami.",
		count = 3,
		ctaText = "Lihat Semua Artikel",
		ctaLink = "/artikel",
		latestPosts = [] as Post[]  // injected by SectionRenderer from page data
	} = $props();

	const displayPosts = $derived((latestPosts as Post[]).slice(0, count));

	function formatDate(d: Date | string | null | undefined): string {
		if (!d) return '';
		return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
	}
</script>

<section class="py-20 lg:py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
			<div>
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-3">{title}</h2>
				<p class="text-lg text-muted-foreground max-w-xl">{subtitle}</p>
			</div>
			{#if ctaText}
				<Button variant="outline" href={ctaLink} class="gap-2 shrink-0 rounded-full px-6">
					{ctaText} <ArrowRight size={16} />
				</Button>
			{/if}
		</div>

		{#if displayPosts.length > 0}
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each displayPosts as p}
					<a href="/artikel/{p.slug}" class="group flex flex-col rounded-3xl border border-border/60 bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
						{#if p.cover}
							<div class="aspect-video overflow-hidden">
								<img
									src={p.cover}
									alt={p.title}
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
						{:else}
							<div class="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
								<span class="text-4xl font-black text-primary/20">{p.title.charAt(0)}</span>
							</div>
						{/if}
						<div class="p-6 flex flex-col flex-1">
							<h3 class="font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
								{p.title}
							</h3>
							{#if p.excerpt}
								<p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
							{/if}
							<div class="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
								<Calendar size={12} />
								{formatDate(p.publishedAt)}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="text-center py-16 text-muted-foreground border-2 border-dashed rounded-3xl">
				<p class="text-sm">Belum ada artikel yang diterbitkan.</p>
			</div>
		{/if}
	</div>
</section>
