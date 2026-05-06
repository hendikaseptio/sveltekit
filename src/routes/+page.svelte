<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { 
		Menu01Icon, 
		Search01Icon, 
		ArrowRight01Icon, 
		UserIcon, 
		Calendar01Icon,
		Mail01Icon,
		GithubIcon,
		TwitterIcon,
		Linkedin01Icon
	} from "@hugeicons/core-free-icons";

	const featuredPosts = [
		{
			title: "The Future of AI in Web Development",
			description: "How artificial intelligence is reshaping the way we build and maintain modern web applications in 2026.",
			image: "/images/post-ai.png",
			category: "Technology",
			date: "May 12, 2026",
			author: "Alex Rivera"
		},
		{
			title: "Mastering Glassmorphism in UI Design",
			description: "A deep dive into creating stunning translucent interfaces using modern CSS techniques and Tailwind.",
			image: "/images/post-design.png",
			category: "Design",
			date: "May 10, 2026",
			author: "Sarah Chen"
		}
	];

	const recentPosts = [
		{
			title: "Svelte 5: The Next Evolution",
			category: "Development",
			date: "May 8, 2026"
		},
		{
			title: "Optimizing Tailwind CSS for Production",
			category: "Performance",
			date: "May 5, 2026"
		},
		{
			title: "Building Scalable Backend with Drizzle",
			category: "Backend",
			date: "May 3, 2026"
		}
	];
</script>

<div class="min-h-screen bg-background font-sans selection:bg-primary/20">
	<!-- Navbar -->
	<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
		<div class="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
					<span class="font-bold">B</span>
				</div>
				<span class="text-xl font-bold tracking-tight">BlogModern</span>
			</div>
			
			<nav class="hidden md:flex items-center gap-6 text-sm font-medium">
				<a href="/" class="transition-colors hover:text-primary">Home</a>
				<a href="/articles" class="transition-colors hover:text-primary">Articles</a>
				<a href="/categories" class="transition-colors hover:text-primary">Categories</a>
				<a href="/about" class="transition-colors hover:text-primary">About</a>
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

	<main class="container mx-auto px-4 py-8 md:px-6">
		<!-- Hero Section -->
		<section class="relative mb-16 overflow-hidden rounded-3xl bg-primary/5 p-8 md:p-12 lg:p-16">
			<div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
			<div class="grid gap-8 lg:grid-cols-2 lg:items-center">
				<div class="flex flex-col gap-6">
					<Badge variant="outline" class="w-fit border-primary/20 bg-primary/10 text-primary">Featured Post</Badge>
					<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
						Insights for the <span class="text-primary">Digital Frontier</span>
					</h1>
					<p class="text-lg text-muted-foreground md:text-xl">
						Explore the latest trends in technology, design, and modern web development through our curated articles.
					</p>
					<div class="flex flex-wrap gap-4">
						<Button size="lg" class="rounded-full px-8">
							Read Latest <HugeiconsIcon icon={ArrowRight01Icon} class="ml-2" size={18} />
						</Button>
						<Button variant="outline" size="lg" class="rounded-full px-8">Browse All</Button>
					</div>
				</div>
				<div class="relative aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-2xl lg:aspect-square">
					<img 
						src="/images/hero.png" 
						alt="Hero" 
						class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
					/>
				</div>
			</div>
		</section>

		<!-- Main Content Grid -->
		<div class="grid gap-12 lg:grid-cols-[1fr_300px]">
			<!-- Blog Posts -->
			<section class="space-y-12">
				<div class="flex items-center justify-between">
					<h2 class="text-3xl font-bold tracking-tight">Featured Articles</h2>
					<a href="/articles" class="text-sm font-medium text-primary hover:underline">View all posts</a>
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					{#each featuredPosts as post}
						<Card.Root class="overflow-hidden border-none bg-transparent group">
							<div class="aspect-video overflow-hidden rounded-xl border border-border/40">
								<img 
									src={post.image} 
									alt={post.title} 
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>
							<Card.Header class="px-0 pb-2">
								<div class="flex items-center gap-4 mb-2">
									<Badge variant="secondary" class="rounded-full">{post.category}</Badge>
									<span class="text-xs text-muted-foreground flex items-center gap-1">
										<HugeiconsIcon icon={Calendar01Icon} size={14} /> {post.date}
									</span>
								</div>
								<Card.Title class="text-2xl group-hover:text-primary transition-colors">
									<a href="/">{post.title}</a>
								</Card.Title>
							</Card.Header>
							<Card.Content class="px-0">
								<p class="text-muted-foreground leading-relaxed">
									{post.description}
								</p>
							</Card.Content>
							<Card.Footer class="px-0 pt-2 border-t border-border/40 flex items-center justify-between mt-4">
								<div class="flex items-center gap-2">
									<div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
										<HugeiconsIcon icon={UserIcon} size={16} class="text-muted-foreground" />
									</div>
									<span class="text-sm font-medium">{post.author}</span>
								</div>
								<Button variant="ghost" size="sm" class="group/btn">
									Read More <HugeiconsIcon icon={ArrowRight01Icon} class="ml-1 transition-transform group-hover/btn:translate-x-1" size={16} />
								</Button>
							</Card.Footer>
						</Card.Root>
					{/each}
				</div>
			</section>

			<!-- Sidebar -->
			<aside class="space-y-10">
				<!-- Newsletter -->
				<section class="rounded-2xl border border-border/40 bg-primary/[0.02] p-6">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<HugeiconsIcon icon={Mail01Icon} size={20} />
					</div>
					<h3 class="mb-2 text-lg font-bold">Join the Newsletter</h3>
					<p class="mb-4 text-sm text-muted-foreground leading-relaxed">
						Get the latest articles and resources delivered straight to your inbox every week.
					</p>
					<form class="space-y-3">
						<input 
							type="email" 
							placeholder="you@example.com" 
							class="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
						/>
						<Button class="w-full">Subscribe Now</Button>
					</form>
				</section>

				<!-- Recent Posts -->
				<section>
					<h3 class="mb-4 text-lg font-bold border-l-4 border-primary pl-3">Recent Posts</h3>
					<div class="space-y-6">
						{#each recentPosts as post}
							<div class="group cursor-pointer">
								<Badge variant="outline" class="mb-1 text-[10px] h-5">{post.category}</Badge>
								<h4 class="font-semibold group-hover:text-primary transition-colors">{post.title}</h4>
								<span class="text-xs text-muted-foreground">{post.date}</span>
							</div>
						{/each}
					</div>
				</section>

				<!-- Categories -->
				<section>
					<h3 class="mb-4 text-lg font-bold border-l-4 border-primary pl-3">Popular Categories</h3>
					<div class="flex flex-wrap gap-2">
						{#each ["Technology", "Design", "DevOps", "AI", "Frontend", "Career"] as cat}
							<Badge variant="secondary" class="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
								{cat}
							</Badge>
						{/each}
					</div>
				</section>
			</aside>
		</div>
	</main>

	<!-- Footer -->
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
						<li><a href="/articles" class="hover:text-primary transition-colors">Articles</a></li>
						<li><a href="/categories" class="hover:text-primary transition-colors">Categories</a></li>
						<li><a href="/about" class="hover:text-primary transition-colors">About Us</a></li>
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
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
