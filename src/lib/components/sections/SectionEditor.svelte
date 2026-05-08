<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import { Plus, Trash2 } from "lucide-svelte";

	let { sections, index }: { sections: any[], index: number } = $props();
</script>

{#if sections[index].type === 'hero'}
	<div class="space-y-4">
		<div class="space-y-2">
			<Label>Judul Utama</Label>
			<Input bind:value={sections[index].props.title} />
		</div>
		<div class="space-y-2">
			<Label>Sub Judul</Label>
			<textarea bind:value={sections[index].props.subtitle} class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" rows="3"></textarea>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label>Teks Tombol</Label>
				<Input bind:value={sections[index].props.ctaText} />
			</div>
			<div class="space-y-2">
				<Label>Link Tombol</Label>
				<Input bind:value={sections[index].props.ctaLink} />
			</div>
		</div>
		<div class="space-y-2">
			<Label>URL Gambar</Label>
			<Input bind:value={sections[index].props.image} />
		</div>
	</div>

{:else if sections[index].type === 'hero-secondary'}
	<div class="space-y-4">
		<div class="space-y-2">
			<Label>Judul</Label>
			<Input bind:value={sections[index].props.title} />
		</div>
		<div class="space-y-2">
			<Label>Sub Judul</Label>
			<textarea bind:value={sections[index].props.subtitle} class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" rows="2"></textarea>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label>Teks Tombol (opsional)</Label>
				<Input bind:value={sections[index].props.ctaText} placeholder="Kosongkan jika tidak perlu" />
			</div>
			<div class="space-y-2">
				<Label>Link Tombol</Label>
				<Input bind:value={sections[index].props.ctaLink} />
			</div>
		</div>
		<div class="space-y-2">
			<Label>Perataan Teks</Label>
			<select bind:value={sections[index].props.align} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
				<option value="left">Kiri</option>
				<option value="center">Tengah</option>
				<option value="right">Kanan</option>
			</select>
		</div>
	</div>

{:else if sections[index].type === 'image-text'}
	<div class="space-y-4">
		<div class="space-y-2">
			<Label>Judul</Label>
			<Input bind:value={sections[index].props.title} />
		</div>
		<div class="space-y-2">
			<Label>Konten (HTML)</Label>
			<textarea bind:value={sections[index].props.content} class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono" rows="5"></textarea>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label>URL Gambar</Label>
				<Input bind:value={sections[index].props.image} />
			</div>
			<div class="space-y-2">
				<Label>Posisi Gambar</Label>
				<select bind:value={sections[index].props.imagePosition} class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
					<option value="left">Kiri</option>
					<option value="right">Kanan</option>
				</select>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label>Teks Tombol (opsional)</Label>
				<Input bind:value={sections[index].props.ctaText} />
			</div>
			<div class="space-y-2">
				<Label>Link Tombol</Label>
				<Input bind:value={sections[index].props.ctaLink} />
			</div>
		</div>
	</div>

{:else if sections[index].type === 'contact'}
	<div class="space-y-4">
		<div class="space-y-2">
			<Label>Judul</Label>
			<Input bind:value={sections[index].props.title} />
		</div>
		<div class="space-y-2">
			<Label>Sub Judul</Label>
			<textarea bind:value={sections[index].props.subtitle} class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" rows="2"></textarea>
		</div>
		<div class="space-y-2">
			<Label>Email</Label>
			<Input bind:value={sections[index].props.email} type="email" />
		</div>
		<div class="space-y-2">
			<Label>Telepon</Label>
			<Input bind:value={sections[index].props.phone} />
		</div>
		<div class="space-y-2">
			<Label>Alamat</Label>
			<textarea bind:value={sections[index].props.address} class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" rows="2"></textarea>
		</div>
	</div>

{:else if sections[index].type === 'faq'}
	<div class="space-y-4">
		<div class="space-y-2">
			<Label>Judul</Label>
			<Input bind:value={sections[index].props.title} />
		</div>
		<div class="space-y-2">
			<Label>Sub Judul</Label>
			<Input bind:value={sections[index].props.subtitle} />
		</div>
		<div class="space-y-3 pt-2">
			<Label>Daftar Pertanyaan</Label>
			{#each sections[index].props.items as _, fi}
				<div class="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-3">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold text-muted-foreground uppercase">FAQ #{fi + 1}</span>
						<Button 
							variant="ghost" 
							size="icon" 
							class="h-7 w-7 text-destructive hover:bg-destructive/10"
							onclick={() => { sections[index].props.items = sections[index].props.items.filter((_: any, idx: number) => idx !== fi); }}
						>
							<Trash2 size={14} />
						</Button>
					</div>
					<div class="space-y-2">
						<Label class="text-xs">Pertanyaan</Label>
						<Input bind:value={sections[index].props.items[fi].question} placeholder="Pertanyaan..." />
					</div>
					<div class="space-y-2">
						<Label class="text-xs">Jawaban</Label>
						<textarea 
							bind:value={sections[index].props.items[fi].answer}
							class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
							rows="3" 
							placeholder="Jawaban..."
						></textarea>
					</div>
				</div>
			{/each}
			<Button 
				variant="outline" 
				class="w-full gap-2 border-dashed"
				onclick={() => { sections[index].props.items = [...sections[index].props.items, { question: '', answer: '' }]; }}
			>
				<Plus size={14} /> Tambah FAQ
			</Button>
		</div>
	</div>

{:else}
	<p class="text-sm text-muted-foreground italic">Tidak ada pengaturan tersedia untuk section ini.</p>
{/if}
