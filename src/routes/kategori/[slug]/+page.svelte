<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Calendar, User, ArrowRight } from 'lucide-svelte';

	let { data } = $props();

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

<div class="container mx-auto px-4 py-8">
	<div class="mb-8">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/kategori">Kategori</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>{data.category.name}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<header class="mb-12">
		<Badge variant="outline" class="mb-4 border-primary/20 bg-primary/10 text-primary">Kategori</Badge>
		<h1 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">{data.category.name}</h1>
		{#if data.category.description}
			<p class="text-xl text-muted-foreground max-w-3xl">
				{data.category.description}
			</p>
		{/if}
	</header>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<Card.Root class="overflow-hidden border-none bg-transparent group">
				<div class="aspect-video overflow-hidden rounded-xl border border-border/40">
					<img 
						src={post.cover || "/images/placeholder.png"} 
						alt={post.title} 
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
				</div>
				<Card.Header class="px-0 pb-2">
					<div class="flex items-center gap-4 mb-2">
						<span class="text-xs text-muted-foreground flex items-center gap-1">
							<Calendar size={14} /> {formatDate(post.publishedAt)}
						</span>
					</div>
					<Card.Title class="text-2xl group-hover:text-primary transition-colors">
						<a href="/artikel/{post.slug}">{post.title}</a>
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-0">
					<p class="text-muted-foreground leading-relaxed line-clamp-3">
						{post.excerpt || ''}
					</p>
				</Card.Content>
				<Card.Footer class="px-0 pt-2 border-t border-border/40 flex items-center justify-between mt-4">
					<div class="flex items-center gap-2">
						<div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
							<User size={16} class="text-muted-foreground" />
						</div>
						<span class="text-sm font-medium">{post.author?.name || 'Anonymous'}</span>
					</div>
					<Button variant="ghost" size="sm" class="group/btn" href="/artikel/{post.slug}">
						Baca Selengkapnya <ArrowRight class="ml-1 transition-transform group-hover/btn:translate-x-1" size={16} />
					</Button>
				</Card.Footer>
			</Card.Root>
		{:else}
			<div class="col-span-full py-20 text-center border-2 border-dashed rounded-3xl">
				<p class="text-muted-foreground text-lg">Belum ada artikel di kategori ini.</p>
				<Button variant="link" href="/artikel" class="mt-2">Lihat semua artikel</Button>
			</div>
		{/each}
	</div>
</div>
