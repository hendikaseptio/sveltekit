<script lang="ts">
	import PostCard from '$lib/components/custom/post-card.svelte';
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
		<h1 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Kumpulan Artikel</h1>
		<p class="text-xl text-muted-foreground max-w-2xl">
			Temukan wawasan terbaru tentang pengembangan web, desain, dan teknologi melalui artikel pilihan kami.
		</p>
	</header>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post}
			<PostCard {post} />
		{:else}
			<div class="col-span-full flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/30 text-center">
				<p class="text-muted-foreground text-lg">Belum ada artikel yang diterbitkan.</p>
			</div>
		{/each}
	</div>
</div>
