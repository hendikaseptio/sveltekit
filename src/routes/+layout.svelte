<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { 
		Menu01Icon, 
		Search01Icon, 
		GithubIcon, 
		TwitterIcon, 
		Linkedin01Icon 
	} from "@hugeicons/core-free-icons";
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// Check if the current route is an auth or admin route
	const isExcludedRoute = $derived(page.url.pathname.startsWith('/auth') || page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background font-sans selection:bg-primary/20">
	<!-- Navbar - Only show if not an auth/admin route -->
	{#if !isExcludedRoute}
		<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
			<div class="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<a href="/" class="flex items-center gap-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<span class="font-bold">B</span>
					</div>
					<span class="text-xl font-bold tracking-tight">BlogModern</span>
				</a>
				
				<nav class="hidden md:flex items-center gap-6 text-sm font-medium">
					<a href="/" class="transition-colors hover:text-primary {page.url.pathname === '/' ? 'text-primary' : ''}">Home</a>
					<a href="/artikel" class="transition-colors hover:text-primary {page.url.pathname.startsWith('/artikel') ? 'text-primary' : ''}">Artikel</a>
					<a href="/categories" class="transition-colors hover:text-primary">Categories</a>
					<a href="/about" class="transition-colors hover:text-primary {page.url.pathname.startsWith('/about') ? 'text-primary' : ''}">Tentang Kami</a>
				</nav>

				<div class="flex items-center gap-4">
					<button class="rounded-full p-2 hover:bg-muted transition-colors">
						<HugeiconsIcon icon={Search01Icon} size={20} />
					</button>
					<Button variant="default" size="sm" class="hidden md:flex">Subscribe</Button>
					<button class="md:hidden rounded-full p-2 hover:bg-muted transition-colors">
						<HugeiconsIcon icon={Menu01Icon} size={20} />
					</button>
				</div>
			</div>
		</header>
	{/if}

	<main>
		{@render children()}
	</main>

	<!-- Footer - Only show if not an auth/admin route -->
	{#if !isExcludedRoute}
		<footer class="mt-20 border-t border-border/40 bg-muted/30 py-12">
			<div class="container mx-auto px-4 md:px-6">
				<div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<span class="font-bold">B</span>
							</div>
							<span class="text-xl font-bold tracking-tight">BlogModern</span>
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed">
							Elevating digital experiences through insightful content and community-driven knowledge sharing.
						</p>
						<div class="flex gap-4">
							<a href="/" class="text-muted-foreground hover:text-primary transition-colors"><HugeiconsIcon icon={GithubIcon} size={20} /></a>
							<a href="/" class="text-muted-foreground hover:text-primary transition-colors"><HugeiconsIcon icon={TwitterIcon} size={20} /></a>
							<a href="/" class="text-muted-foreground hover:text-primary transition-colors"><HugeiconsIcon icon={Linkedin01Icon} size={20} /></a>
						</div>
					</div>
					
					<div>
						<h4 class="mb-4 font-bold">Quick Links</h4>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li><a href="/" class="hover:text-primary transition-colors">Home</a></li>
							<li><a href="/artikel" class="hover:text-primary transition-colors">Artikel</a></li>
							<li><a href="/categories" class="hover:text-primary transition-colors">Categories</a></li>
							<li><a href="/about" class="hover:text-primary transition-colors">Tentang Kami</a></li>
						</ul>
					</div>

					<div>
						<h4 class="mb-4 font-bold">Resources</h4>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li><a href="/" class="hover:text-primary transition-colors">Documentation</a></li>
							<li><a href="/" class="hover:text-primary transition-colors">Community</a></li>
							<li><a href="/" class="hover:text-primary transition-colors">Tutorials</a></li>
							<li><a href="/" class="hover:text-primary transition-colors">Open Source</a></li>
						</ul>
					</div>

					<div>
						<h4 class="mb-4 font-bold">Legal</h4>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li><a href="/" class="hover:text-primary transition-colors">Privacy Policy</a></li>
							<li><a href="/" class="hover:text-primary transition-colors">Terms of Service</a></li>
							<li><a href="/" class="hover:text-primary transition-colors">Cookie Policy</a></li>
						</ul>
					</div>
				</div>
				
				<div class="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
					<p>© 2026 BlogModern. Built with SvelteKit & Tailwind CSS.</p>
				</div>
			</div>
		</footer>
	{/if}
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
