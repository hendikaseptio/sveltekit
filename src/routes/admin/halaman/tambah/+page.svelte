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
		Layout,
		Settings2,
		Save
	} from "lucide-svelte";
	import SectionRenderer from "$lib/components/sections/SectionRenderer.svelte";
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";

	let { form } = $props();
	
	let title = $state('');
	let slug = $state('');
	let sections = $state([]);
	
	let activeTab = $state("editor");

	$effect(() => {
		if (title && !slug) {
			slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
		}
	});

	const sectionTypes = [
		{ 
			type: 'hero', 
			name: 'Hero Section', 
			icon: Layout,
			defaultProps: { 
				title: 'Judul Hero Baru', 
				subtitle: 'Tuliskan deskripsi singkat yang menarik di sini.', 
				ctaText: 'Mulai Sekarang', 
				ctaLink: '#', 
				image: '/images/hero.png' 
			} 
		},
		{ 
			type: 'image-text', 
			name: 'Gambar & Teks', 
			icon: Settings2,
			defaultProps: { 
				title: 'Fitur Unggulan', 
				content: '<p>Jelaskan detail fitur atau layanan Anda di sini dengan lebih mendalam.</p>', 
				image: '/images/placeholder.png', 
				imagePosition: 'left',
				ctaText: 'Pelajari Lebih Lanjut',
				ctaLink: '#'
			} 
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
</script>

<div class="h-screen flex flex-col overflow-hidden bg-muted/30">
	<!-- Top Bar -->
	<header class="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
		<div class="flex items-center gap-4">
			<Button href="/admin/halaman" variant="ghost" size="icon">
				<ArrowLeft size={18} />
			</Button>
			<div>
				<h2 class="text-sm font-bold leading-none">{title || 'Halaman Baru'}</h2>
				<p class="text-xs text-muted-foreground mt-1">/{slug || '...'}</p>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<Tabs.Root bind:value={activeTab} class="w-[200px]">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="editor">Editor</Tabs.Trigger>
					<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
			
			<form method="POST" class="inline">
				<input type="hidden" name="title" value={title} />
				<input type="hidden" name="slug" value={slug} />
				<input type="hidden" name="content" value="[Structured Content]" />
				<input type="hidden" name="sections" value={JSON.stringify(sections)} />
				<Button type="submit" size="sm" class="gap-2">
					<Save size={16} />
					Simpan Halaman
				</Button>
			</form>
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
								<Input bind:value={title} placeholder="Tentang Kami" required />
							</div>
							<div class="space-y-2">
								<Label class="text-xs uppercase tracking-wider opacity-60">Slug URL</Label>
								<Input bind:value={slug} placeholder="tentang-kami" required />
							</div>
						</div>
					</div>
				</aside>

				<!-- Main Editor -->
				<div class="flex-1 overflow-y-auto p-8 flex justify-center">
					<div class="w-full max-w-2xl space-y-4">
						{#if form?.error}
							<div class="bg-destructive/10 text-destructive p-4 rounded-lg text-sm border border-destructive/20 mb-4">
								{form.error}
							</div>
						{/if}

						<div 
							use:dndzone={{ items: sections, flipDurationMs, dragDisabled: expandedSectionId !== null }} 
							onconsider={handleDndConsider} 
							onfinalize={handleDndFinalize}
							class="space-y-4"
						>
							{#each sections as section (section.id)}
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
											<Card.Content class="p-6 space-y-6 bg-background">
												{#if section.type === 'hero'}
													<div class="space-y-4">
														<div class="space-y-2">
															<Label>Judul Utama</Label>
															<Input bind:value={section.props.title} />
														</div>
														<div class="space-y-2">
															<Label>Sub Judul</Label>
															<textarea 
																bind:value={section.props.subtitle} 
																class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
																rows="3"
															></textarea>
														</div>
														<div class="grid grid-cols-2 gap-4">
															<div class="space-y-2">
																<Label>Teks Tombol</Label>
																<Input bind:value={section.props.ctaText} />
															</div>
															<div class="space-y-2">
																<Label>Link Tombol</Label>
																<Input bind:value={section.props.ctaLink} />
															</div>
														</div>
														<div class="space-y-2">
															<Label>URL Gambar</Label>
															<Input bind:value={section.props.image} />
														</div>
													</div>
												{:else}
													<div class="space-y-4">
														<div class="space-y-2">
															<Label>Judul</Label>
															<Input bind:value={section.props.title} />
														</div>
														<div class="space-y-2">
															<Label>Konten (HTML)</Label>
															<textarea 
																bind:value={section.props.content} 
																class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono"
																rows="5"
															></textarea>
														</div>
														<div class="grid grid-cols-2 gap-4">
															<div class="space-y-2">
																<Label>URL Gambar</Label>
																<Input bind:value={section.props.image} />
															</div>
															<div class="space-y-2">
																<Label>Posisi Gambar</Label>
																<select 
																	bind:value={section.props.imagePosition}
																	class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
																>
																	<option value="left">Kiri</option>
																	<option value="right">Kanan</option>
																</select>
															</div>
														</div>
													</div>
												{/if}
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
