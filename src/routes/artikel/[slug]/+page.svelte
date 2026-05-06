<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { ArrowRight01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-8 lg:px-6">
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

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
		<!-- Main Content -->
		<div class="lg:col-span-8">
			<article class="prose prose-slate dark:prose-invert lg:prose-xl max-w-none">
				<header class="mb-8">
					<div class="mb-4 flex items-center gap-3">
						<Badge variant="secondary" class="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3">
							Teknologi
						</Badge>
						<span class="flex items-center gap-1.5 text-sm text-muted-foreground">
							<HugeiconsIcon icon={Calendar01Icon} size={16} />
							{new Date(data.article.publishedAt).toLocaleDateString('id-ID', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</span>
					</div>
					<h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{data.article.title}
					</h1>
				</header>

				<div class="mt-8 text-lg leading-relaxed text-foreground/90">
					{data.article.content}
				</div>

				<footer class="mt-16 border-t border-border/40 pt-10">
					<Button variant="outline" href="/artikel" class="gap-2 group">
						<span class="transition-transform group-hover:-translate-x-1">&larr;</span>
						Kembali ke Daftar Artikel
					</Button>
				</footer>
			</article>
		</div>

		<!-- Sidebar Sidebar Panel -->
		<aside class="lg:col-span-4 space-y-8">
			<div class="sticky top-24">
				<Card.Root class="overflow-hidden border-border/40 shadow-sm">
					<Card.Header class="bg-muted/30">
						<Card.Title class="text-lg font-bold">Postingan Lainnya</Card.Title>
						<Card.Description>Mungkin Anda juga tertarik dengan ini</Card.Description>
					</Card.Header>
					<Card.Content class="p-0">
						<div class="divide-y divide-border/40">
							{#each data.otherPosts as post}
								<a 
									href="/artikel/{post.slug}" 
									class="group block p-4 transition-colors hover:bg-muted/50"
								>
									<div class="space-y-1">
										<h4 class="font-semibold leading-tight group-hover:text-primary transition-colors">
											{post.title}
										</h4>
										<p class="text-xs text-muted-foreground flex items-center gap-1">
											<HugeiconsIcon icon={Calendar01Icon} size={12} />
											{new Date(post.publishedAt).toLocaleDateString('id-ID', {
												day: 'numeric',
												month: 'short'
											})}
										</p>
									</div>
								</a>
							{:else}
								<div class="p-8 text-center text-sm text-muted-foreground">
									Belum ada postingan lain.
								</div>
							{/each}
						</div>
					</Card.Content>
					<Card.Footer class="p-4 bg-muted/10 border-t border-border/40">
						<Button variant="ghost" size="sm" href="/artikel" class="w-full gap-2 text-primary hover:text-primary hover:bg-primary/5">
							Lihat Semua Artikel
							<HugeiconsIcon icon={ArrowRight01Icon} size={16} />
						</Button>
					</Card.Footer>
				</Card.Root>

				<!-- Additional Sidebar Widget (Newsletter/Call to Action) -->
				<div class="mt-8 p-6 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden group">
					<div class="relative z-10">
						<h3 class="text-xl font-bold mb-2">Berlangganan Newsletter</h3>
						<p class="text-primary-foreground/80 text-sm mb-4 leading-relaxed">
							Dapatkan pembaruan artikel terbaru langsung di email Anda setiap minggu.
						</p>
						<div class="flex flex-col gap-2">
							<input 
								type="email" 
								placeholder="Email Anda" 
								class="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
							/>
							<Button variant="secondary" class="w-full font-bold">Gabung Sekarang</Button>
						</div>
					</div>
					<!-- Background Decorative Element -->
					<div class="absolute -right-4 -bottom-4 bg-white/10 rounded-full h-24 w-24 blur-2xl transition-transform group-hover:scale-150 duration-700"></div>
				</div>
			</div>
		</aside>
	</div>
</div>
