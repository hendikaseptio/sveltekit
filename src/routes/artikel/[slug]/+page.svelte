<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { 
		ArrowRight, 
		Calendar, 
		Share2, 
		Link as LinkIcon,
		Check
	} from "lucide-svelte";
	import SEO from "$lib/components/SEO.svelte";
	import { page } from '$app/state';

	let { data } = $props();
	
	let copied = $state(false);
	const currentUrl = $derived(page.url.href);

	function copyToClipboard() {
		navigator.clipboard.writeText(currentUrl);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	const shareLinks = $derived([
		{
			name: 'Facebook',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
			color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10'
		},
		{
			name: 'X (Twitter)',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
			href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(data.article.title)}`,
			color: 'hover:text-black hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10'
		},
		{
			name: 'LinkedIn',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>`,
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
			color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
		}
	]);
</script>

<SEO 
	title={data.article.title} 
	description={data.article.excerpt || "Baca artikel selengkapnya di website kami."}
	image={data.article.cover || "/images/hero.png"}
	type="article"
	url={currentUrl}
/>

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
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<Badge variant="secondary" class="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3">
								Teknologi
							</Badge>
							<span class="flex items-center gap-1.5 text-sm text-muted-foreground">
								<Calendar size={16} />
								{new Date(data.article.publishedAt).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							</span>
						</div>

						<!-- Social Share Buttons (SVG) -->
						<div class="flex items-center gap-1">
							{#each shareLinks as link}
								<Button 
									variant="ghost" 
									size="icon" 
									href={link.href} 
									target="_blank" 
									class="h-9 w-9 rounded-full {link.color}"
									title="Share to {link.name}"
								>
									{@html link.icon}
								</Button>
							{/each}
							<Button 
								variant="ghost" 
								size="icon" 
								onclick={copyToClipboard} 
								class="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
								title="Copy Link"
							>
								{#if copied}
									<Check size={18} class="text-green-500" />
								{:else}
									<LinkIcon size={18} />
								{/if}
							</Button>
						</div>
					</div>
					<h1 class="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{data.article.title}
					</h1>
					{#if data.article.cover}
						<div class="overflow-hidden rounded-3xl border border-border/50 shadow-lg mb-10">
							<img src={data.article.cover} alt={data.article.title} class="w-full aspect-video object-cover" />
						</div>
					{/if}
				</header>

				<div class="mt-8 text-lg leading-relaxed text-foreground/90">
					{@html data.article.content}
				</div>

				<footer class="mt-16 border-t border-border/40 pt-10">
					<div class="flex flex-col sm:flex-row items-center justify-between gap-6">
						<Button variant="outline" href="/artikel" class="gap-2 group">
							<span class="transition-transform group-hover:-translate-x-1">&larr;</span>
							Kembali ke Daftar Artikel
						</Button>

						<div class="flex items-center gap-3">
							<span class="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<Share2 size={16} /> Bagikan:
							</span>
							<div class="flex items-center gap-1">
								{#each shareLinks as link}
									<Button 
										variant="outline" 
										size="icon" 
										href={link.href} 
										target="_blank" 
										class="h-10 w-10 rounded-full {link.color}"
									>
										{@html link.icon}
									</Button>
								{/each}
								<Button 
									variant="outline" 
									size="icon" 
									onclick={copyToClipboard} 
									class="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary"
								>
									{#if copied}
										<Check size={20} class="text-green-500" />
									{:else}
										<LinkIcon size={20} />
									{/if}
								</Button>
							</div>
						</div>
					</div>
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
											<Calendar size={12} />
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
							<ArrowRight size={16} />
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
