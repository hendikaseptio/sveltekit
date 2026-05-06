<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Badge } from '$lib/components/ui/badge';

	let { data } = $props();
</script>

<div class="container mx-auto max-w-3xl px-4 py-8">
	<div class="mb-8">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/artikel">Artikel</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>{data.article.title}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<article class="prose prose-slate dark:prose-invert lg:prose-xl mx-auto">
		<header class="mb-8">
			<div class="mb-4 flex items-center gap-2">
				<Badge variant="outline">Teknologi</Badge>
				<span class="text-sm text-muted-foreground">
					{new Date(data.article.publishedAt).toLocaleDateString('id-ID', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</span>
			</div>
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{data.article.title}
			</h1>
		</header>

		<div class="mt-8 text-lg leading-relaxed">
			{data.article.content}
		</div>

		<footer class="mt-12 border-t pt-8">
			<Button variant="ghost" href="/artikel" class="gap-2">
				&larr; Kembali ke Daftar Artikel
			</Button>
		</footer>
	</article>
</div>
