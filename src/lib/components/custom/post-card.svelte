<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Calendar, User, ArrowRight, Clock, Image as ImageIcon } from 'lucide-svelte';

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
			month: 'short',
			year: 'numeric'
		});
	}

	// Calculate read time (estimate)
	const readTime = $derived(post.excerpt ? Math.ceil(post.excerpt.split(' ').length / 200) : 1);

	// Generate a unique gradient based on the title for posts without covers
	const defaultGradient = $derived.by(() => {
		const colors = [
			'from-indigo-500 to-purple-600',
			'from-blue-500 to-cyan-500',
			'from-emerald-500 to-teal-600',
			'from-rose-500 to-orange-500',
			'from-amber-500 to-yellow-500'
		];
		const charCodeSum = post.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return colors[charCodeSum % colors.length];
	});
</script>

<Card.Root class="group flex flex-col overflow-hidden border-none bg-transparent transition-all duration-300">
	<!-- Image Container -->
	{#if post.cover}
		<div class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
			<img
				src={post.cover}
				alt={post.title}
				class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
			/>
			
			<!-- Overlay Gradient -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

			<!-- Category Badge -->
			{#if post.category}
				<Badge variant="secondary" class="absolute top-4 left-4 z-10 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
					{post.category.name}
				</Badge>
			{/if}

			<!-- Reading Time -->
			<div class="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs font-medium text-white opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
				<Clock size={12} />
				{readTime} min read
			</div>
		</div>
	{:else}
		<!-- Default Dynamic Gradient Placeholder -->
		<div class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br {defaultGradient} shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
			<div class="absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-500 group-hover:scale-125">
				<ImageIcon size={80} class="text-white" />
			</div>
			
			<!-- Subtle Pattern Overlay -->
			<div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

			<!-- Category Badge -->
			{#if post.category}
				<Badge variant="secondary" class="absolute top-4 left-4 z-10 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
					{post.category.name}
				</Badge>
			{/if}

			<!-- Reading Time -->
			<div class="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs font-medium text-white/90">
				<Clock size={12} />
				{readTime} min read
			</div>
		</div>
	{/if}

	<!-- Content -->
	<Card.Header class="px-1 pb-2 pt-6">
		<div class="mb-3 flex items-center gap-3 text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
			<span class="flex items-center gap-1.5">
				<Calendar size={13} class="text-primary/70" /> {formatDate(post.publishedAt)}
			</span>
			<span class="h-1 w-1 rounded-full bg-border"></span>
			<span class="flex items-center gap-1.5">
				<User size={13} class="text-primary/70" /> {post.author?.name || 'Admin'}
			</span>
		</div>
		
		<Card.Title class="text-xl md:text-2xl font-black leading-[1.15] tracking-tight transition-colors duration-300 group-hover:text-primary">
			<a href="/artikel/{post.slug}" class="block">
				{post.title}
			</a>
		</Card.Title>
	</Card.Header>

	<Card.Content class="flex-1 px-1">
		<p class="line-clamp-2 text-sm md:text-base text-muted-foreground leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
			{post.excerpt || 'Temukan wawasan mendalam tentang topik ini dalam artikel lengkap kami.'}
		</p>
	</Card.Content>

	<Card.Footer class="mt-6 flex items-center justify-between border-t border-border/20 px-1 pt-5">
		<a 
			href="/artikel/{post.slug}" 
			class="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 group-hover:gap-3"
		>
			Baca Selengkapnya
			<ArrowRight size={18} class="transition-transform duration-300" />
		</a>
		
		<div class="flex -space-x-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-bold text-primary">
				{post.author?.name?.[0] || 'A'}
			</div>
		</div>
	</Card.Footer>
</Card.Root>
