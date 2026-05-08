// Generates a self-contained, static Svelte file from page builder sections

function esc(str: string): string {
	return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Track which icons each section needs
const SECTION_ICONS: Record<string, string[]> = {
	'hero':           ['ArrowRight'],
	'hero-secondary': ['ArrowRight'],
	'image-text':     ['ArrowRight'],
	'contact':        ['Mail', 'Phone', 'MapPin', 'Send'],
	'faq':            ['ChevronDown'],
	'cta':            ['ArrowRight'],
	'posts':          ['Calendar', 'ArrowRight'],
};

function collectIcons(sections: any[]): string[] {
	const icons = new Set<string>();
	for (const s of sections) {
		const needed = SECTION_ICONS[s.type] || [];
		needed.forEach(i => icons.add(i));
	}
	return Array.from(icons).sort();
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
					${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">${esc(p.ctaText)} <ArrowRight size={18} /></a>` : ''}
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
				${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">${esc(p.ctaText)} <ArrowRight size={16} /></a>` : ''}
			</div>
		</div>
	</section>`;
}

function genImageText(p: any): string {
	const isRight = p.imagePosition === 'right';
	const imgBlock = `<div class="relative"><img src="${esc(p.image)}" alt="${esc(p.title)}" class="w-full rounded-3xl object-cover shadow-xl" /></div>`;
	return `
	<!-- Image & Text Section -->
	<section class="py-20 lg:py-24">
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
				${!isRight ? imgBlock : ''}
				<div class="space-y-6">
					<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">${esc(p.title)}</h2>
					<div class="prose prose-lg dark:prose-invert text-muted-foreground">${p.content || ''}</div>
					${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">${esc(p.ctaText)} <ArrowRight size={16} /></a>` : ''}
				</div>
				${isRight ? imgBlock : ''}
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
						${p.email ? `<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Mail size={20} /></div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p><a href="mailto:${esc(p.email)}" class="font-medium hover:text-primary transition-colors">${esc(p.email)}</a></div></div>` : ''}
						${p.phone ? `<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Phone size={20} /></div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Telepon</p><a href="tel:${esc(p.phone)}" class="font-medium hover:text-primary transition-colors">${esc(p.phone)}</a></div></div>` : ''}
						${p.address ? `<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><MapPin size={20} /></div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Alamat</p><p class="font-medium">${esc(p.address)}</p></div></div>` : ''}
					</div>
				</div>
				<div class="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-5">
					<div class="space-y-2"><label class="text-sm font-medium">Nama Lengkap</label><input type="text" placeholder="Nama kamu" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
					<div class="space-y-2"><label class="text-sm font-medium">Email</label><input type="email" placeholder="email@kamu.com" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
					<div class="space-y-2"><label class="text-sm font-medium">Pesan</label><textarea placeholder="Tulis pesan kamu..." rows="5" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></textarea></div>
					<button type="button" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"><Send size={16} /> Kirim Pesan</button>
				</div>
			</div>
		</div>
	</section>`;
}

function genFaq(p: any): string {
	const items = (p.items || []).map((item: any) => `
					<details class="rounded-2xl border border-border/60 bg-card px-6 overflow-hidden group">
						<summary class="py-5 font-semibold text-base cursor-pointer list-none flex justify-between items-center hover:text-primary transition-colors">
							${esc(item.question)}
							<ChevronDown size={16} class="text-muted-foreground transition-transform group-open:rotate-180" />
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
				${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center justify-center gap-2 rounded-full bg-background/20 px-8 py-3 text-base font-semibold hover:bg-background/30 transition-colors border border-white/20">${esc(p.ctaText)} <ArrowRight size={18} /></a>` : ''}
				${p.ctaSecondaryText ? `<a href="${esc(p.ctaSecondaryLink)}" class="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-semibold border border-current/40 hover:bg-white/10 transition-colors">${esc(p.ctaSecondaryText)}</a>` : ''}
			</div>
		</div>
	</section>`;
}

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
				${p.ctaText ? `<a href="${esc(p.ctaLink)}" class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2 font-medium hover:bg-muted transition-colors shrink-0">${esc(p.ctaText)} <ArrowRight size={16} /></a>` : ''}
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
								{#if post.publishedAt}
									<div class="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
										<Calendar size={12} />
										{new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
									</div>
								{/if}
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
	const icons = collectIcons(sections);
	const iconImport = icons.length > 0
		? `\timport { ${icons.join(', ')} } from 'lucide-svelte';\n` : '';

	const bodyParts = sections.map(inlineSection).join('\n');

	const script = `<script lang="ts">
${iconImport}${hasPosts ? `\t// data.posts is provided by +page.server.ts\n\tlet { data } = $props();\n` : ''}	// Page: ${pageData.title}
</script>

`;

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
	// For HTML export, replace Lucide components with inline SVGs (contact icons only)
	const htmlContactFix = (html: string) =>
		html
			.replace(/<Mail size=\{20\} \/>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>')
			.replace(/<Phone size=\{20\} \/>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/></svg>')
			.replace(/<MapPin size=\{20\} \/>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>')
			.replace(/<Send size=\{16\} \/>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>')
			.replace(/<ArrowRight size=\{(?:16|18)\} \/>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>')
			.replace(/<ChevronDown size=\{16\}[^/]*\/>/g, '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>');

	const body = sections.map(s => {
		const p = s.props || {};
		let html = '';
		switch (s.type) {
			case 'hero':           html = genHero(p); break;
			case 'hero-secondary': html = genHeroSecondary(p); break;
			case 'image-text':     html = genImageText(p); break;
			case 'contact':        html = genContact(p); break;
			case 'faq':            html = genFaq(p); break;
			case 'cta':            html = genCta(p); break;
			case 'posts':          html = `<section class="py-20 text-center text-muted-foreground border-2 border-dashed m-8 rounded-3xl">[Artikel Terbaru — membutuhkan server data]</section>`; break;
			default: html = '';
		}
		return htmlContactFix(html);
	}).join('\n');

	return `<!DOCTYPE html>
<html lang="id">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${esc(pageData.title)}</title>
	<script src="https://cdn.tailwindcss.com"><\/script>
	<style>
		:root { --primary: 221 83% 53%; --primary-foreground: 0 0% 100%; --muted: 220 14% 96%; --muted-foreground: 220 8% 46%; --border: 220 13% 91%; --background: 0 0% 100%; --foreground: 224 71% 4%; --card: 0 0% 100%; --input: 220 13% 91%; }
		.text-primary { color: hsl(var(--primary)); } .bg-primary { background-color: hsl(var(--primary)); }
		.text-primary-foreground { color: hsl(var(--primary-foreground)); } .text-muted-foreground { color: hsl(var(--muted-foreground)); }
		.bg-muted\\/40 { background-color: hsl(var(--muted) / 0.4); } .border-border\\/50 { border-color: hsl(var(--border) / 0.5); }
		.border-border\\/60 { border-color: hsl(var(--border) / 0.6); } .bg-card { background-color: hsl(var(--card)); }
		.bg-background { background-color: hsl(var(--background)); } .border-input { border-color: hsl(var(--input)); }
		details summary::-webkit-details-marker { display: none; }
		details[open] summary svg { transform: rotate(180deg); }
		summary svg { transition: transform 0.2s; }
	</style>
</head>
<body class="min-h-screen bg-white font-sans antialiased">
${body}
</body>
</html>`;
}
