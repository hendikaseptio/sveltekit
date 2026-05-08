<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Calendar, User, ArrowRight } from 'lucide-svelte';

	interface Author {
		name: string | null;
	}

	interface Category {
		name: string | null;
	}

	interface Post {
		title: string;
		slug: string;
		excerpt?: string | null;
		cover?: string | null;
		publishedAt?: Date | string | null;
		author?: Author | null;
		category?: Category | null;
	}

	let { post }: { post: Post } = $props();

	function formatDate(date: Date | string | null | undefined) {
		if (!date) return '';
		const d = typeof date === 'string' ? new Date(date) : date;
		return d.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<Card.Root class="group flex flex-col overflow-hidden border-none bg-transparent">
	<div class="relative aspect-video overflow-hidden rounded-xl border border-border/40 shadow-sm">
		<img
			src={post.cover || '/images/placeholder.png'}
			alt={post.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>
		{#if post.category}
			<Badge variant="secondary" class="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm shadow-sm">
				{post.category.name}
			</Badge>
		{/if}
	</div>

	<Card.Header class="px-0 pb-2 pt-6">
		<div class="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
			<span class="flex items-center gap-1">
				<Calendar size={14} /> {formatDate(post.publishedAt)}
			</span>
		</div>
		<Card.Title class="text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
			<a href="/artikel/{post.slug}">{post.title}</a>
		</Card.Title>
	</Card.Header>

	<Card.Content class="flex-1 px-0">
		<p class="line-clamp-3 text-muted-foreground leading-relaxed">
			{post.excerpt || 'Tidak ada ringkasan tersedia.'}
		</p>
	</Card.Content>

	<Card.Footer class="mt-4 flex items-center justify-between border-t border-border/40 px-0 pt-4">
		<div class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted shadow-inner">
				<User size={16} class="text-muted-foreground" />
			</div>
			<span class="text-sm font-medium">{post.author?.name || 'Anonymous'}</span>
		</div>
		<Button variant="ghost" size="sm" class="group/btn hover:bg-primary/5 hover:text-primary transition-colors" href="/artikel/{post.slug}">
			Baca Selengkapnya
			<ArrowRight class="ml-1.5 transition-transform group-hover/btn:translate-x-1" size={16} />
		</Button>
	</Card.Footer>
</Card.Root>
