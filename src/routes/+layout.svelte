<script lang="ts">
	import { page } from '$app/state';
	import { localizeHref as resolve } from '$lib/paraglide/runtime';
	import { Button } from "$lib/components/ui/button";
	import { 
		Menu, 
		Search, 
		Globe, 
		Send, 
		UserRound,
		X,
		ArrowRight
	} from "lucide-svelte";
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { fade, slide, fly } from 'svelte/transition';

	let { children, data } = $props();

	// Check if the current route is an auth or admin route
	const isExcludedRoute = $derived(page.url.pathname.startsWith('/auth') || page.url.pathname.startsWith('/admin'));
	const settings = $derived(data.settings);
	const menus = $derived(data.menus || []);

	// Mobile Menu State
	let isMobileMenuOpen = $state(false);
	
	// Search State
	let isSearchOpen = $state(false);
	let searchQuery = $state("");

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen) isSearchOpen = false;
	}

	function toggleSearch() {
		isSearchOpen = !isSearchOpen;
		if (isSearchOpen) {
			isMobileMenuOpen = false;
			// Auto focus search input would be nice here
		}
	}

	// Close menus on navigation
	$effect(() => {
		// This runs when page changes
		const path = page.url.pathname;
		isMobileMenuOpen = false;
		isSearchOpen = false;
	});
</script>

<svelte:head>
	<title>{settings?.siteName || 'BlogModern'}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background font-sans selection:bg-primary/20">
	<!-- Navbar - Only show if not an auth/admin route -->
	{#if !isExcludedRoute}
		<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
			<div class="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<a href={resolve("/")} class="flex items-center gap-2">
					{#if settings?.siteLogo}
						<img src={settings.siteLogo} alt="Logo" class="h-8 object-contain" />
					{:else}
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<span class="font-bold">{settings?.siteName?.[0] || 'B'}</span>
						</div>
					{/if}
					<span class="text-xl font-bold tracking-tight">{settings?.siteName || 'BlogModern'}</span>
				</a>
				
				<!-- Desktop Nav -->
				<nav class="hidden md:flex items-center gap-6 text-sm font-medium">
					{#each menus as item}
						<a 
							href={item.isExternal ? item.url : resolve(item.url)} 
							target={item.isExternal ? "_blank" : undefined}
							class="transition-colors hover:text-primary {page.url.pathname === item.url ? 'text-primary' : ''}"
						>
							{item.label}
						</a>
					{/each}
					{#if menus.length === 0}
						<a href={resolve("/")} class="transition-colors hover:text-primary {page.url.pathname === '/' ? 'text-primary' : ''}">Home</a>
						<a href={resolve("/artikel")} class="transition-colors hover:text-primary {page.url.pathname.startsWith('/artikel') ? 'text-primary' : ''}">Artikel</a>
						<a href={resolve("/kategori")} class="transition-colors hover:text-primary {page.url.pathname.startsWith('/kategori') ? 'text-primary' : ''}">Kategori</a>
						<a href={resolve("/about")} class="transition-colors hover:text-primary {page.url.pathname.startsWith('/about') ? 'text-primary' : ''}">Tentang Kami</a>
					{/if}
				</nav>

				<div class="flex items-center gap-2 md:gap-4">
					<button 
						onclick={toggleSearch}
						class="rounded-full p-2 hover:bg-muted transition-colors"
						aria-label="Search"
					>
						{#if isSearchOpen}
							<X size={20} />
						{:else}
							<Search size={20} />
						{/if}
					</button>
					<Button variant="default" size="sm" class="hidden md:flex">Subscribe</Button>
					<button 
						onclick={toggleMobileMenu}
						class="md:hidden rounded-full p-2 hover:bg-muted transition-colors"
						aria-label="Menu"
					>
						{#if isMobileMenuOpen}
							<X size={20} />
						{:else}
							<Menu size={20} />
						{/if}
					</button>
				</div>
			</div>

			<!-- Search Overlay -->
			{#if isSearchOpen}
				<div 
					transition:slide={{ duration: 200 }}
					class="border-t border-border/40 bg-background p-4"
				>
					<div class="container mx-auto max-w-2xl relative">
						<form action="/artikel" method="GET" class="relative">
							<Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
							<input 
								type="text" 
								name="q"
								bind:value={searchQuery}
								placeholder="Cari artikel..." 
								class="w-full rounded-xl border border-border bg-muted/50 px-10 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
								autoFocus
							/>
							{#if searchQuery}
								<button 
									type="submit"
									class="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-medium text-xs hover:underline"
								>
									Cari
								</button>
							{/if}
						</form>
					</div>
				</div>
			{/if}
		</header>

		<!-- Mobile Menu Drawer -->
		{#if isMobileMenuOpen}
			<div 
				transition:fade={{ duration: 200 }}
				class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
				onclick={() => isMobileMenuOpen = false}
			></div>
			<div 
				transition:fly={{ x: 300, duration: 300 }}
				class="fixed right-0 top-0 z-50 h-full w-[280px] bg-background border-l border-border/40 p-6 shadow-2xl md:hidden"
			>
				<div class="flex flex-col h-full">
					<div class="flex items-center justify-between mb-8">
						<span class="text-lg font-bold">Menu</span>
						<button onclick={() => isMobileMenuOpen = false} class="p-2 hover:bg-muted rounded-full">
							<X size={20} />
						</button>
					</div>
					
					<nav class="flex flex-col gap-4">
						{#each menus as item}
							<a 
								href={item.isExternal ? item.url : resolve(item.url)} 
								class="flex items-center justify-between group py-2 text-lg font-medium transition-colors hover:text-primary"
							>
								{item.label}
								<ArrowRight size={18} class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
							</a>
						{/each}
						{#if menus.length === 0}
							<a href={resolve("/")} class="py-2 text-lg font-medium hover:text-primary">Home</a>
							<a href={resolve("/artikel")} class="py-2 text-lg font-medium hover:text-primary">Artikel</a>
							<a href={resolve("/kategori")} class="py-2 text-lg font-medium hover:text-primary">Kategori</a>
							<a href={resolve("/about")} class="py-2 text-lg font-medium hover:text-primary">Tentang Kami</a>
						{/if}
					</nav>

					<div class="mt-auto pt-8 border-t border-border/40">
						<Button class="w-full rounded-xl">Subscribe Now</Button>
						<p class="mt-6 text-center text-xs text-muted-foreground italic">
							Follow our latest updates
						</p>
					</div>
				</div>
			</div>
		{/if}
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
							{#if settings?.siteLogo}
								<img src={settings.siteLogo} alt="Logo" class="h-8 object-contain" />
							{:else}
								<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<span class="font-bold">{settings?.siteName?.[0] || 'B'}</span>
								</div>
							{/if}
							<span class="text-xl font-bold tracking-tight">{settings?.siteName || 'BlogModern'}</span>
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed">
							{settings?.address || 'Elevating digital experiences through insightful content and community-driven knowledge sharing.'}
						</p>
						{#if settings?.phone}
							<p class="text-sm text-muted-foreground">Telp: {settings.phone}</p>
						{/if}
						<div class="flex gap-4">
							{#if settings?.facebook}
								<a href={settings.facebook} target="_blank" class="text-muted-foreground hover:text-primary transition-colors"><Globe size={20} /></a>
							{/if}
							{#if settings?.instagram}
								<a href={settings.instagram} target="_blank" class="text-muted-foreground hover:text-primary transition-colors"><Send size={20} /></a>
							{/if}
							{#if settings?.x}
								<a href={settings.x} target="_blank" class="text-muted-foreground hover:text-primary transition-colors"><UserRound size={20} /></a>
							{/if}
						</div>
					</div>
					
					<div>
						<h4 class="mb-4 font-bold">Quick Links</h4>
						<ul class="space-y-2 text-sm text-muted-foreground">
							{#each menus as item}
								<li>
									<a 
										href={item.isExternal ? item.url : resolve(item.url)} 
										target={item.isExternal ? "_blank" : undefined}
										class="hover:text-primary transition-colors"
									>
										{item.label}
									</a>
								</li>
							{/each}
							{#if menus.length === 0}
								<li><a href={resolve("/")} class="hover:text-primary transition-colors">Home</a></li>
								<li><a href={resolve("/artikel")} class="hover:text-primary transition-colors">Artikel</a></li>
								<li><a href={resolve("/kategori")} class="hover:text-primary transition-colors">Kategori</a></li>
								<li><a href={resolve("/about")} class="hover:text-primary transition-colors">Tentang Kami</a></li>
							{/if}
						</ul>
					</div>

					<div>
						<h4 class="mb-4 font-bold">Resources</h4>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Documentation</a></li>
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Community</a></li>
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Tutorials</a></li>
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Open Source</a></li>
						</ul>
					</div>

					<div>
						<h4 class="mb-4 font-bold">Legal</h4>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Privacy Policy</a></li>
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Terms of Service</a></li>
							<li><a href={resolve("/")} class="hover:text-primary transition-colors">Cookie Policy</a></li>
						</ul>
					</div>
				</div>
				
				<div class="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
					<p>© 2026 {settings?.siteName || 'BlogModern'}. Built with SvelteKit & Tailwind CSS.</p>
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
