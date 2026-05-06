<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';

	let { data } = $props();
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
					<Breadcrumb.Page>Artikel</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">Kumpulan Artikel</h1>
		<p class="text-xl text-muted-foreground">
			Temukan wawasan terbaru tentang pengembangan web, desain, dan teknologi.
		</p>
	</header>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<Card.Root class="flex flex-col overflow-hidden transition-all hover:shadow-lg">
				<Card.Header>
					<div class="mb-2 flex items-center justify-between">
						<Badge variant="secondary">Tutorial</Badge>
						<span class="text-xs text-muted-foreground">
							{new Date(post.publishedAt).toLocaleDateString('id-ID', {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							})}
						</span>
					</div>
					<Card.Title class="line-clamp-2 leading-tight">
						{post.title}
					</Card.Title>
					<Card.Description class="mt-2 line-clamp-3">
						{post.excerpt || 'Tidak ada ringkasan tersedia.'}
					</Card.Description>
				</Card.Header>
				<Card.Footer class="mt-auto pt-4">
					<Button variant="outline" href="/artikel/{post.slug}" class="w-full">
						Baca Selengkapnya
					</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>

	{#if data.posts.length === 0}
		<div class="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-center">
			<p class="text-muted-foreground">Belum ada artikel yang diterbitkan.</p>
		</div>
	{/if}
</div>
