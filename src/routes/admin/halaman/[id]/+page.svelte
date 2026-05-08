<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import * as Tabs from "$lib/components/ui/tabs";
	import { 
		ArrowLeft, 
		Plus, 
		GripVertical, 
		Trash2, 
		ChevronDown, 
		ChevronUp,
		Eye,
		Settings2,
		Layout,
		Save,
		Download,
		X,
		Code,
		FileCode,
		Globe
	} from "lucide-svelte";
	import SectionRenderer from "$lib/components/sections/SectionRenderer.svelte";
	import SectionEditor from "$lib/components/sections/SectionEditor.svelte";
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { Mail, HelpCircle, Megaphone, Newspaper } from "lucide-svelte";

	let { data, form } = $props();
	
	let title = $state(data.page.title);
	let slug = $state(data.page.slug);
	let status = $state(data.page.status || 'draft');
	let sections = $state(data.page.sections ? JSON.parse(data.page.sections) : []);
	
	let activeTab = $state("editor");

	const sectionTypes = [
		{ 
			type: 'hero', 
			name: 'Hero Utama', 
			icon: Layout,
			defaultProps: { title: 'Judul Hero', subtitle: 'Deskripsi menarik di sini.', ctaText: 'Mulai Sekarang', ctaLink: '#', image: '/images/hero.png' } 
		},
		{ 
			type: 'hero-secondary', 
			name: 'Hero Simple', 
			icon: Layout,
			defaultProps: { title: 'Judul Section', subtitle: 'Deskripsi singkat.', ctaText: '', ctaLink: '#', align: 'center' } 
		},
		{ 
			type: 'image-text', 
			name: 'Gambar & Teks', 
			icon: Settings2,
			defaultProps: { title: 'Fitur Unggulan', content: '<p>Jelaskan detail di sini.</p>', image: '/images/placeholder.png', imagePosition: 'left', ctaText: '', ctaLink: '#' } 
		},
		{ 
			type: 'contact', 
			name: 'Kontak', 
			icon: Mail,
			defaultProps: { title: 'Hubungi Kami', subtitle: 'Kami siap membantu Anda.', email: 'hello@example.com', phone: '+62 812-3456-7890', address: 'Jl. Contoh No. 1, Jakarta' } 
		},
		{ 
			type: 'faq', 
			name: 'FAQ', 
			icon: HelpCircle,
			defaultProps: { title: 'Pertanyaan Umum', subtitle: 'Temukan jawaban di sini.', items: [{ question: 'Pertanyaan 1?', answer: 'Jawaban 1.' }] } 
		},
		{ 
			type: 'cta', 
			name: 'CTA Banner', 
			icon: Megaphone,
			defaultProps: { title: 'Siap Memulai?', subtitle: 'Bergabunglah dan rasakan manfaatnya sekarang.', ctaText: 'Mulai Sekarang', ctaLink: '#', ctaSecondaryText: '', ctaSecondaryLink: '#', variant: 'gradient' } 
		},
		{ 
			type: 'posts', 
			name: 'Artikel Terbaru', 
			icon: Newspaper,
			defaultProps: { title: 'Artikel Terbaru', subtitle: 'Baca wawasan terkini dari kami.', count: 3, ctaText: 'Lihat Semua', ctaLink: '/artikel' } 
		}
	];

	function addSection(type: string) {
		const config = sectionTypes.find(t => t.type === type);
		if (!config) return;

		sections = [...sections, {
			id: crypto.randomUUID(),
			type: config.type,
			props: { ...config.defaultProps }
		}];
	}

	function removeSection(id: string) {
		sections = sections.filter(s => s.id !== id);
	}

	function handleDndConsider(e: any) {
		sections = e.detail.items;
	}

	function handleDndFinalize(e: any) {
		sections = e.detail.items;
	}

	let expandedSectionId = $state<string | null>(null);

	function toggleExpand(id: string) {
		expandedSectionId = expandedSectionId === id ? null : id;
	}

	const flipDurationMs = 300;

	// --- Export ---
	let showExport = $state(false);
	let exportTab = $state<'svelte'|'server'|'html'>('svelte');
	let exportCode = $state('');
	let exportLoading = $state(false);
	let hasPosts = $derived(sections.some((s: any) => s.type === 'posts'));

	async function openExport() {
		showExport = true;
		await loadExportCode(exportTab);
	}

	async function loadExportCode(tab: string) {
		exportLoading = true;
		try {
			const res = await fetch(`/admin/halaman/${data.page.id}/export?type=${tab}`);
			exportCode = await res.text();
		} finally {
			exportLoading = false;
		}
	}

	async function switchExportTab(tab: 'svelte'|'server'|'html') {
		exportTab = tab;
		await loadExportCode(tab);
	}

	function downloadExport() {
		const filename = exportTab === 'svelte' ? '+page.svelte' : exportTab === 'server' ? '+page.server.ts' : `${slug}.html`;
		const blob = new Blob([exportCode], { type: 'text/plain' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = filename;
		a.click();
	}

	function copyExport() {
		navigator.clipboard.writeText(exportCode);
	}
</script>

<div class="h-screen flex flex-col overflow-hidden bg-muted/30">
	<!-- Top Bar -->
	<header class="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
		<div class="flex items-center gap-4">
			<Button href="/admin/halaman" variant="ghost" size="icon">
				<ArrowLeft size={18} />
			</Button>
			<div>
				<h2 class="text-sm font-bold leading-none">{title || 'Tanpa Judul'}</h2>
				<p class="text-xs text-muted-foreground mt-1">/{slug}</p>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<Tabs.Root bind:value={activeTab} class="w-[200px]">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="editor">Editor</Tabs.Trigger>
					<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
			
			<form method="POST" class="inline flex items-center gap-2">
				<input type="hidden" name="title" value={title} />
				<input type="hidden" name="slug" value={slug} />
				<input type="hidden" name="content" value="[Structured Content]" />
				<input type="hidden" name="sections" value={JSON.stringify(sections)} />
				<input type="hidden" name="status" value={status} />
				<select
					bind:value={status}
					class="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
				>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
				<Button type="submit" size="sm" class="gap-2">
					<Save size={16} />
					Simpan
				</Button>
			</form>
			<Button variant="outline" size="sm" class="gap-2" onclick={openExport}>
				<Download size={16} /> Export
			</Button>
		</div>
	</header>

	<main class="flex-1 overflow-hidden flex">
		{#if activeTab === "editor"}
			<!-- Editor View -->
			<div class="w-full flex">
				<!-- Sidebar: Section Types -->
				<aside class="w-64 border-r bg-background p-6 space-y-6 shrink-0 overflow-y-auto">
					<div>
						<h3 class="text-sm font-bold mb-4 flex items-center gap-2">
							<Plus size={16} class="text-primary" />
							Tambah Section
						</h3>
						<div class="grid gap-2">
							{#each sectionTypes as type}
								<Button 
									variant="outline" 
									class="justify-start gap-3 h-auto py-3 px-4"
									onclick={() => addSection(type.type)}
								>
									<type.icon size={18} class="text-muted-foreground" />
									<div class="text-left">
										<div class="text-xs font-bold">{type.name}</div>
									</div>
								</Button>
							{/each}
						</div>
					</div>

					<div class="pt-6 border-t">
						<h3 class="text-sm font-bold mb-4">Pengaturan Dasar</h3>
						<div class="space-y-4">
							<div class="space-y-2">
								<Label class="text-xs uppercase tracking-wider opacity-60">Judul Halaman</Label>
								<Input bind:value={title} placeholder="Tentang Kami" />
							</div>
							<div class="space-y-2">
								<Label class="text-xs uppercase tracking-wider opacity-60">Slug URL</Label>
								<Input bind:value={slug} placeholder="tentang-kami" />
							</div>
						</div>
					</div>
				</aside>

				<!-- Main Editor: Section Reordering & Props -->
				<div class="flex-1 overflow-y-auto p-8 flex justify-center">
					<div class="w-full max-w-2xl space-y-4">
						<div 
							use:dndzone={{ items: sections, flipDurationMs, dragDisabled: expandedSectionId !== null }} 
							onconsider={handleDndConsider} 
							onfinalize={handleDndFinalize}
							class="space-y-4"
						>
							{#each sections as section, i (section.id)}
								<div animate:flip={{ duration: flipDurationMs }}>
									<Card.Root class="overflow-hidden border-2 {expandedSectionId === section.id ? 'border-primary' : 'border-transparent shadow-sm'}">
										<div class="flex items-center px-4 py-3 bg-muted/20">
											<div class="cursor-grab active:cursor-grabbing text-muted-foreground p-1 hover:bg-muted rounded">
												<GripVertical size={16} />
											</div>
											<div class="flex-1 ml-2">
												<span class="text-xs font-bold uppercase tracking-wider text-muted-foreground">
													{section.type}
												</span>
											</div>
											<div class="flex items-center gap-1">
												<Button 
													variant="ghost" 
													size="icon" 
													class="h-8 w-8"
													onclick={() => toggleExpand(section.id)}
												>
													{#if expandedSectionId === section.id}
														<ChevronUp size={16} />
													{:else}
														<ChevronDown size={16} />
													{/if}
												</Button>
												<Button 
													variant="ghost" 
													size="icon" 
													class="h-8 w-8 text-destructive hover:bg-destructive/10"
													onclick={() => removeSection(section.id)}
												>
													<Trash2 size={16} />
												</Button>
											</div>
										</div>

										{#if expandedSectionId === section.id}
											<Card.Content class="p-6 bg-background">
												<SectionEditor {sections} index={i} />
											</Card.Content>
										{/if}
									</Card.Root>
								</div>
							{/each}
						</div>

						{#if sections.length === 0}
							<div class="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-3xl bg-background/50 text-center">
								<Layout size={48} class="text-muted-foreground/30 mb-4" />
								<h4 class="text-lg font-bold opacity-60">Halaman Kosong</h4>
								<p class="text-sm text-muted-foreground mt-2 max-w-xs">
									Klik salah satu section di sidebar untuk mulai membangun halaman Anda.
								</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<!-- Preview View -->
			<div class="flex-1 overflow-y-auto bg-background">
				<div class="max-w-7xl mx-auto border-x min-h-full shadow-2xl">
					{#each sections as section}
						<SectionRenderer {section} />
					{/each}

					{#if sections.length === 0}
						<div class="flex items-center justify-center min-h-screen text-muted-foreground italic">
							Belum ada konten untuk ditampilkan.
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</main>
</div>

<!-- Export Modal -->
{#if showExport}
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onclick={() => showExport = false}>
	<div class="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-background shadow-2xl" onclick={(e) => e.stopPropagation()}>
		<!-- Header -->
		<div class="flex items-center justify-between px-6 py-4 border-b shrink-0">
			<div>
				<h2 class="text-lg font-bold">Export Halaman</h2>
				<p class="text-xs text-muted-foreground mt-0.5">Unduh source code siap pakai untuk project SvelteKit lain</p>
			</div>
			<button onclick={() => showExport = false} class="p-2 rounded-lg hover:bg-muted transition-colors">
				<X size={18} />
			</button>
		</div>

		<!-- Tabs -->
		<div class="flex gap-1 px-6 pt-4 shrink-0">
			<button
				onclick={() => switchExportTab('svelte')}
				class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors {exportTab === 'svelte' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}"
			>
				<Code size={14} /> +page.svelte
			</button>
			{#if hasPosts}
			<button
				onclick={() => switchExportTab('server')}
				class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors {exportTab === 'server' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}"
			>
				<FileCode size={14} /> +page.server.ts
			</button>
			{/if}
			<button
				onclick={() => switchExportTab('html')}
				class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors {exportTab === 'html' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}"
			>
				<Globe size={14} /> HTML Standalone
			</button>
		</div>

		<!-- Info banner per tab -->
		<div class="px-6 pt-3 shrink-0">
			{#if exportTab === 'svelte'}
				<div class="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
					📄 Copy file ini sebagai <strong>+page.svelte</strong> di project SvelteKit kamu. {hasPosts ? 'Perlu digunakan bersama +page.server.ts.' : 'Tidak butuh server file — halaman ini sepenuhnya statis.'}
				</div>
			{:else if exportTab === 'server'}
				<div class="rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 px-4 py-3 text-xs text-purple-700 dark:text-purple-300">
					⚙️ Copy file ini sebagai <strong>+page.server.ts</strong> di folder yang sama dengan +page.svelte. Sesuaikan import path jika skema DB kamu berbeda.
				</div>
			{:else}
				<div class="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-4 py-3 text-xs text-green-700 dark:text-green-300">
					🌐 HTML standalone dengan Tailwind CDN — buka langsung di browser atau host di mana saja tanpa build step.
				</div>
			{/if}
		</div>

		<!-- Code viewer -->
		<div class="flex-1 overflow-hidden px-6 py-3">
			{#if exportLoading}
				<div class="flex items-center justify-center h-48 text-muted-foreground text-sm">Memuat kode...</div>
			{:else}
				<pre class="h-full overflow-auto rounded-xl bg-zinc-950 dark:bg-zinc-900 text-zinc-100 p-5 text-xs leading-relaxed font-mono border border-zinc-800">{exportCode}</pre>
			{/if}
		</div>

		<!-- Footer actions -->
		<div class="flex items-center justify-between px-6 py-4 border-t shrink-0">
			<span class="text-xs text-muted-foreground">
				{exportTab === 'svelte' ? '+page.svelte' : exportTab === 'server' ? '+page.server.ts' : slug + '.html'}
			</span>
			<div class="flex gap-2">
				<button
					onclick={copyExport}
					class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
				>
					📋 Copy
				</button>
				<button
					onclick={downloadExport}
					class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors gap-2"
				>
					<Download size={14} /> Download
				</button>
			</div>
		</div>
	</div>
</div>
{/if}

<style>
	:global(.custom-scrollbar::-webkit-scrollbar) {
		width: 6px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb) {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
	:global(.dark .custom-scrollbar::-webkit-scrollbar-thumb) {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
