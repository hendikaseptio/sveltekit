<script lang="ts">
	import PostCard from '$lib/components/custom/post-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
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
			<PostCard {post} />
		{:else}
			<div class="col-span-full py-20 text-center border-2 border-dashed rounded-3xl bg-muted/20">
				<p class="text-muted-foreground text-lg">Belum ada artikel di kategori ini.</p>
				<Button variant="link" href="/artikel" class="mt-2 text-primary">Lihat semua artikel</Button>
			</div>
		{/each}
	</div>
</div>
