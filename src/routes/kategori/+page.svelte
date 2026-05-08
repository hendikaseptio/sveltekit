<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { FolderOpen, ArrowRight } from 'lucide-svelte';

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
					<Breadcrumb.Page>Kategori</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Kategori Artikel</h1>
		<p class="text-xl text-muted-foreground max-w-2xl">
			Pilih topik yang menarik bagi Anda dan temukan kumpulan artikel mendalam tentang teknologi dan desain.
		</p>
	</header>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.categories as cat}
			<Card.Root class="group relative overflow-hidden border-none bg-primary/5 transition-all hover:bg-primary/10">
				<Card.Header>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
						<FolderOpen size={24} />
					</div>
					<Card.Title class="text-2xl">{cat.name}</Card.Title>
					<Card.Description class="line-clamp-2">
						{cat.description || `Kumpulan artikel tentang ${cat.name}.`}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Badge variant="secondary" class="rounded-full">
						{cat.postCount} Artikel
					</Badge>
				</Card.Content>
				<Card.Footer>
					<Button variant="ghost" href="/kategori/{cat.slug}" class="group/btn w-full justify-between">
						Lihat Artikel
						<ArrowRight size={18} class="transition-transform group-hover/btn:translate-x-1" />
					</Button>
				</Card.Footer>
			</Card.Root>
		{:else}
			<div class="col-span-full py-12 text-center text-muted-foreground">
				Belum ada kategori yang tersedia.
			</div>
		{/each}
	</div>
</div>
