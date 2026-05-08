<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import PostCard from "$lib/components/custom/post-card.svelte";
	import { 
		ArrowRight, 
		User, 
		Calendar,
		Mail
	} from "lucide-svelte";

	let { data } = $props();

	const featuredPosts = data.posts.slice(0, 2);
	const recentPosts = data.posts.slice(2, 5);
	const categories = data.categories;

	function formatDate(date: Date | string | null) {
		if (!date) return '';
		const d = typeof date === 'string' ? new Date(date) : date;
		return d.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<div class="container mx-auto px-4 py-8 md:px-6">
	<!-- Hero Section -->
	<section class="relative mb-16 overflow-hidden rounded-3xl bg-primary/5 p-8 md:p-12 lg:p-16">
		<div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
		<div class="grid gap-8 lg:grid-cols-2 lg:items-center">
			<div class="flex flex-col gap-6">
				<Badge variant="outline" class="w-fit border-primary/20 bg-primary/10 text-primary">Featured Post</Badge>
				<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
					Insights for the <span class="text-primary">Digital Frontier</span>
				</h1>
				<p class="text-lg text-muted-foreground md:text-xl">
					Explore the latest trends in technology, design, and modern web development through our curated articles.
				</p>
				<div class="flex flex-wrap gap-4">
					<Button size="lg" class="rounded-full px-8" href="/artikel">
						Read Latest <ArrowRight class="ml-2" size={18} />
					</Button>
					<Button variant="outline" size="lg" class="rounded-full px-8" href="/artikel">Browse All</Button>
				</div>
			</div>
			<div class="relative aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-2xl lg:aspect-square">
				<img 
					src="/images/hero.png" 
					alt="Hero" 
					class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
				/>
			</div>
		</div>
	</section>

	<!-- Main Content Grid -->
	<div class="grid gap-12 lg:grid-cols-[1fr_300px]">
		<!-- Blog Posts -->
		<section class="space-y-12">
			<div class="items-center justify-between flex">
				<h2 class="text-3xl font-bold tracking-tight">Featured Articles</h2>
				<a href="/artikel" class="text-sm font-medium text-primary hover:underline">View all posts</a>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each featuredPosts as post}
					<PostCard {post} />
				{:else}
					<div class="col-span-full py-12 text-center text-muted-foreground">
						Belum ada artikel yang diterbitkan.
					</div>
				{/each}
			</div>
		</section>

		<!-- Sidebar -->
		<aside class="space-y-10">
			<!-- Newsletter -->
			<section class="rounded-2xl border border-border/40 bg-primary/[0.02] p-6">
				<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Mail size={20} />
				</div>
				<h3 class="mb-2 text-lg font-bold">Join the Newsletter</h3>
				<p class="mb-4 text-sm text-muted-foreground leading-relaxed">
					Get the latest articles and resources delivered straight to your inbox every week.
				</p>
				<form class="space-y-3">
					<input 
						type="email" 
						placeholder="you@example.com" 
						class="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
					/>
					<Button class="w-full">Subscribe Now</Button>
				</form>
			</section>

			<!-- Recent Posts -->
			<section>
				<h3 class="mb-4 text-lg font-bold border-l-4 border-primary pl-3">Recent Posts</h3>
				<div class="space-y-6">
					{#each recentPosts as post}
						<a href="/artikel/{post.slug}" class="group block cursor-pointer">
							<Badge variant="outline" class="mb-1 text-[10px] h-5">{post.category?.name || 'Uncategorized'}</Badge>
							<h4 class="font-semibold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
							<span class="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
						</a>
					{/each}
				</div>
			</section>

			<!-- Categories -->
			<section>
				<h3 class="mb-4 text-lg font-bold border-l-4 border-primary pl-3">Popular Categories</h3>
				<div class="flex flex-wrap gap-2">
					{#each categories as cat}
						<Badge variant="secondary" class="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
							<a href="/kategori/{cat.slug}">{cat.name}</a>
						</Badge>
					{/each}
				</div>
			</section>
		</aside>
	</div>
</div>
