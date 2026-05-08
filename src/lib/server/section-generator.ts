// Generates a self-contained, static Svelte file from page builder sections

function esc(str: string): string {
	return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function genHero(p: any): string {
	return `
	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-background py-20 lg:py-32">
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
				<div class="space-y-8">
					<h1 class="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">${esc(p.title)}</h1>
					<p class="text-xl text-muted-foreground leading-relaxed">${esc(p.subtitle)}</p>
					${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">${esc(p.ctaText)}</a>` : ''}
				</div>
				${p.image ? `<div class="relative"><img src="${esc(p.image)}" alt="${esc(p.title)}" class="w-full rounded-3xl object-cover shadow-2xl" /></div>` : ''}
			</div>
		</div>
	</section>`;
}

function genHeroSecondary(p: any): string {
	const alignClass = p.align === 'right' ? 'ml-auto text-right' : p.align === 'left' ? 'text-left' : 'mx-auto text-center';
	return `
	<!-- Hero Secondary Section -->
	<section class="py-16 lg:py-20 bg-muted/40 border-y border-border/50">
		<div class="container mx-auto px-4 md:px-6">
			<div class="max-w-3xl ${alignClass}">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-4">${esc(p.title)}</h2>
				<p class="text-lg text-muted-foreground leading-relaxed mb-6">${esc(p.subtitle)}</p>
				${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">${esc(p.ctaText)}</a>` : ''}
			</div>
		</div>
	</section>`;
}

function genImageText(p: any): string {
	const isRight = p.imagePosition === 'right';
	return `
	<!-- Image & Text Section -->
	<section class="py-20 lg:py-24">
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid gap-12 lg:grid-cols-2 lg:items-center ${isRight ? '' : ''}">
				${isRight ? '' : `<div class="relative order-last lg:order-first">
					<img src="${esc(p.image)}" alt="${esc(p.title)}" class="w-full rounded-3xl object-cover shadow-xl" />
				</div>`}
				<div class="space-y-6">
					<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">${esc(p.title)}</h2>
					<div class="prose prose-lg dark:prose-invert text-muted-foreground">${p.content || ''}</div>
					${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">${esc(p.ctaText)}</a>` : ''}
				</div>
				${isRight ? `<div class="relative">
					<img src="${esc(p.image)}" alt="${esc(p.title)}" class="w-full rounded-3xl object-cover shadow-xl" />
				</div>` : ''}
			</div>
		</div>
	</section>`;
}

function genContact(p: any): string {
	return `
	<!-- Contact Section -->
	<section class="py-20 lg:py-24">
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid gap-16 lg:grid-cols-2 lg:items-start">
				<div class="space-y-8">
					<div>
						<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-4">${esc(p.title)}</h2>
						<p class="text-lg text-muted-foreground leading-relaxed">${esc(p.subtitle)}</p>
					</div>
					<div class="space-y-5">
						${p.email ? `<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">✉</div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p><a href="mailto:${esc(p.email)}" class="font-medium hover:text-primary transition-colors">${esc(p.email)}</a></div></div>` : ''}
						${p.phone ? `<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">☎</div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Telepon</p><a href="tel:${esc(p.phone)}" class="font-medium hover:text-primary transition-colors">${esc(p.phone)}</a></div></div>` : ''}
						${p.address ? `<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">📍</div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Alamat</p><p class="font-medium">${esc(p.address)}</p></div></div>` : ''}
					</div>
				</div>
				<div class="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-5">
					<div class="space-y-2"><label class="text-sm font-medium">Nama Lengkap</label><input type="text" placeholder="Nama kamu" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
					<div class="space-y-2"><label class="text-sm font-medium">Email</label><input type="email" placeholder="email@kamu.com" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
					<div class="space-y-2"><label class="text-sm font-medium">Pesan</label><textarea placeholder="Tulis pesan kamu..." rows="5" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></textarea></div>
					<button type="button" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Kirim Pesan</button>
				</div>
			</div>
		</div>
	</section>`;
}

function genFaq(p: any): string {
	const items = (p.items || []).map((item: any, i: number) => `
					<details class="rounded-2xl border border-border/60 bg-card px-6 overflow-hidden group">
						<summary class="py-5 font-semibold text-base cursor-pointer list-none flex justify-between items-center hover:text-primary transition-colors">
							${esc(item.question)}
							<span class="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
						</summary>
						<div class="pb-5 text-muted-foreground leading-relaxed">${esc(item.answer)}</div>
					</details>`).join('\n');
	return `
	<!-- FAQ Section -->
	<section class="py-20 lg:py-24">
		<div class="container mx-auto px-4 md:px-6">
			<div class="mx-auto max-w-3xl">
				<div class="text-center mb-12">
					<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-4">${esc(p.title)}</h2>
					<p class="text-lg text-muted-foreground">${esc(p.subtitle)}</p>
				</div>
				<div class="space-y-3">${items}
				</div>
			</div>
		</div>
	</section>`;
}

function genCta(p: any): string {
	const bg = p.variant === 'dark' ? 'bg-foreground text-background' : p.variant === 'light' ? 'bg-muted text-foreground' : 'bg-gradient-to-br from-primary to-primary/70 text-primary-foreground';
	return `
	<!-- CTA Section -->
	<section class="py-20 lg:py-28 ${bg}">
		<div class="container mx-auto px-4 md:px-6 text-center">
			<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-5 max-w-3xl mx-auto">${esc(p.title)}</h2>
			<p class="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">${esc(p.subtitle)}</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center justify-center gap-2 rounded-full bg-background/20 px-8 py-3 text-base font-semibold hover:bg-background/30 transition-colors border border-white/20">${esc(p.ctaText)} →</a>` : ''}
				${p.ctaSecondaryText ? `<a href="${esc(p.ctaSecondaryLink)}" class="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-semibold border border-current/40 hover:bg-white/10 transition-colors">${esc(p.ctaSecondaryText)}</a>` : ''}
			</div>
		</div>
	</section>`;
}

// Posts section — dynamic, keeps $props() pattern
function genPostsTemplate(p: any): string {
	return `
	<!-- Posts Section — data from +page.server.ts -->
	<section class="py-20 lg:py-24">
		<div class="container mx-auto px-4 md:px-6">
			<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
				<div>
					<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-3">${esc(p.title)}</h2>
					<p class="text-lg text-muted-foreground max-w-xl">${esc(p.subtitle)}</p>
				</div>
				${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2 font-medium hover:bg-muted transition-colors shrink-0">${esc(p.ctaText)} →</a>` : ''}
			</div>
			{#if data.posts && data.posts.length > 0}
				<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-${Math.min(p.count || 3, 3)}">
					{#each data.posts.slice(0, ${p.count || 3}) as post}
						<a href="/artikel/{post.slug}" class="group flex flex-col rounded-3xl border border-border/60 bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							{#if post.cover}
								<div class="aspect-video overflow-hidden">
									<img src={post.cover} alt={post.title} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
								</div>
							{:else}
								<div class="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
									<span class="text-4xl font-black text-primary/20">{post.title.charAt(0)}</span>
								</div>
							{/if}
							<div class="p-6 flex flex-col flex-1">
								<h3 class="font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
								{#if post.excerpt}<p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>{/if}
								{#if post.publishedAt}<div class="mt-auto text-xs text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>{/if}
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="text-center py-16 text-muted-foreground border-2 border-dashed rounded-3xl">Belum ada artikel.</div>
			{/if}
		</div>
	</section>`;
}

function inlineSection(section: any): string {
	const p = section.props || {};
	switch (section.type) {
		case 'hero':           return genHero(p);
		case 'hero-secondary': return genHeroSecondary(p);
		case 'image-text':     return genImageText(p);
		case 'contact':        return genContact(p);
		case 'faq':            return genFaq(p);
		case 'cta':            return genCta(p);
		case 'posts':          return genPostsTemplate(p);
		default:               return `\n\t<!-- Unknown section: ${section.type} -->`;
	}
}

export function generateSvelteFile(pageData: any, sections: any[]): string {
	const hasPosts = sections.some(s => s.type === 'posts');
	const bodyParts = sections.map(inlineSection).join('\n');

	const script = hasPosts ? `<script lang="ts">
	// data.posts is provided by +page.server.ts
	let { data } = $props();
</script>

` : '';

	return `${script}<svelte:head>
	<title>${esc(pageData.title)}</title>
	<meta name="description" content="${esc(pageData.title)}" />
</svelte:head>

<div class="min-h-screen">${bodyParts}
</div>
`;
}

export function generateServerFile(sections: any[]): string | null {
	const hasPosts = sections.some(s => s.type === 'posts');
	if (!hasPosts) return null;

	const postsCount = Math.max(...sections.filter(s => s.type === 'posts').map(s => s.props?.count || 3));

	return `import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await db
		.select()
		.from(post)
		.where(eq(post.status, 'published'))
		.orderBy(desc(post.publishedAt))
		.limit(${postsCount});

	return { posts };
};
`;
}

export function generateHtmlPreview(pageData: any, sections: any[]): string {
	const body = sections.map(s => {
		const p = s.props || {};
		switch (s.type) {
			case 'hero': return genHero(p);
			case 'hero-secondary': return genHeroSecondary(p);
			case 'image-text': return genImageText(p);
			case 'contact': return genContact(p);
			case 'faq': return genFaq(p);
			case 'cta': return genCta(p);
			case 'posts': return `<section class="py-20 text-center text-muted-foreground">[Artikel Terbaru — requires server data]</section>`;
			default: return '';
		}
	}).join('\n');

	return `<!DOCTYPE html>
<html lang="id">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${esc(pageData.title)}</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<style>
		:root { --primary: 221 83% 53%; --primary-foreground: 0 0% 100%; --muted: 220 14% 96%; --muted-foreground: 220 8% 46%; --border: 220 13% 91%; --background: 0 0% 100%; --foreground: 224 71% 4%; --card: 0 0% 100%; }
		.text-primary { color: hsl(var(--primary)); }
		.bg-primary { background-color: hsl(var(--primary)); }
		.text-primary-foreground { color: hsl(var(--primary-foreground)); }
		.text-muted-foreground { color: hsl(var(--muted-foreground)); }
		.bg-muted\\/40 { background-color: hsl(var(--muted) / 0.4); }
		.border-border\\/50 { border-color: hsl(var(--border) / 0.5); }
		.border-border\\/60 { border-color: hsl(var(--border) / 0.6); }
		.bg-card { background-color: hsl(var(--card)); }
		.bg-background { background-color: hsl(var(--background)); }
		details summary::-webkit-details-marker { display: none; }
	</style>
</head>
<body class="min-h-screen bg-white font-sans antialiased">
${body}
</body>
</html>`;
}
