<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Card from "$lib/components/ui/card";
	import { Upload, Trash2, FileIcon, ImageIcon, Search, Plus, X } from "lucide-svelte";
	import { enhance } from "$app/forms";
	import { toast } from "svelte-sonner";

	let { data, form } = $props();
	
	let searchQuery = $state("");
	let filterUnused = $state(false);
	let isUploading = $state(false);
	let isCleaning = $state(false);

	const filteredMedia = $derived(
		data.media.filter(m => {
			const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesFilter = filterUnused ? !m.isUsed : true;
			return matchesSearch && matchesFilter;
		})
	);

	const unusedCount = $derived(data.media.filter(m => !m.isUsed).length);

	function formatSize(bytes: number) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	function isImage(type: string) {
		return type.startsWith('image/');
	}
</script>

<div class="flex flex-col gap-6 py-6 px-4 lg:px-6">
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Media Library</h2>
			<p class="text-muted-foreground">Kelola semua file gambar dan dokumen Anda.</p>
		</div>
		
		<form 
			method="POST" 
			action="?/upload" 
			enctype="multipart/form-data" 
			use:enhance={() => {
				isUploading = true;
				return async ({ result, update }) => {
					isUploading = false;
					if (result.type === 'success') {
						toast.success("Berhasil mengupload file");
					} else if (result.type === 'failure') {
						toast.error(result.data?.error || "Gagal mengupload file");
					}
					update();
				};
			}}
			class="flex items-center gap-2"
		>
			<Input type="file" name="files" multiple class="max-w-[250px]" id="file-upload" />
			<Button type="submit" disabled={isUploading}>
				{#if isUploading}
					<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2"></div>
					Uploading...
				{:else}
					<Upload size={18} class="mr-2" />
					Upload
				{/if}
			</Button>
		</form>
	</div>

	<div class="flex items-center gap-2 max-w-4xl">
		<div class="relative flex-1 max-w-md">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Cari media..."
				class="pl-9"
				bind:value={searchQuery}
			/>
		</div>
		
		<Button 
			variant={filterUnused ? "secondary" : "outline"} 
			size="sm" 
			onclick={() => filterUnused = !filterUnused}
			class="gap-2"
		>
			<Trash2 size={16} />
			Tampilkan Sampah ({unusedCount})
		</Button>

		{#if unusedCount > 0}
			<form 
				method="POST" 
				action="?/cleanup" 
				use:enhance={() => {
					isCleaning = true;
					return async ({ result, update }) => {
						isCleaning = false;
						if (result.type === 'success') {
							toast.success(`Berhasil menghapus ${result.data?.deletedCount} file tak terpakai`);
						}
						update();
					};
				}}
			>
				<Button type="submit" variant="destructive" size="sm" disabled={isCleaning} class="gap-2">
					{#if isCleaning}
						<div class="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
					{:else}
						<X size={16} />
					{/if}
					Bersihkan Sampah
				</Button>
			</form>
		{/if}
	</div>

	{#if filteredMedia.length === 0}
		<div class="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
			<FileIcon size={48} class="text-muted-foreground/50 mb-4" />
			<p class="text-muted-foreground">Tidak ada media yang ditemukan.</p>
		</div>
	{:else}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{#each filteredMedia as item (item.id)}
				<Card.Root class="overflow-hidden group relative">
					{#if !item.isUsed}
						<div class="absolute top-2 left-2 z-20">
							<span class="bg-destructive text-destructive-foreground text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">SAMPAH</span>
						</div>
					{/if}
					<Card.Content class="p-0 aspect-square flex items-center justify-center bg-muted/50">
						{#if isImage(item.type)}
							<img src={item.path} alt={item.name} class="w-full h-full object-cover transition-transform group-hover:scale-105" />
						{:else}
							<div class="flex flex-col items-center gap-2 text-muted-foreground">
								<FileIcon size={32} />
								<span class="text-[10px] font-mono uppercase">{item.type.split('/')[1] || 'FILE'}</span>
							</div>
						{/if}
						
						<!-- Overlay Actions -->
						<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
							<form 
								method="POST" 
								action="?/delete" 
								use:enhance={() => {
									return async ({ result, update }) => {
										if (result.type === 'success') {
											toast.success("File dihapus");
										}
										update();
									};
								}}
							>
								<input type="hidden" name="id" value={item.id} />
								<Button size="icon" variant="destructive" class="h-8 w-8" type="submit">
									<Trash2 size={14} />
								</Button>
							</form>
							
							<Button size="icon" variant="secondary" class="h-8 w-8" onclick={() => {
								navigator.clipboard.writeText(window.location.origin + item.path);
								toast.success("Link disalin!");
							}}>
								<Plus size={14} />
							</Button>
						</div>
					</Card.Content>
					<div class="p-2 border-t bg-card">
						<p class="text-[10px] font-medium truncate mb-0.5" title={item.name}>{item.name}</p>
						<p class="text-[9px] text-muted-foreground">{formatSize(item.size)}</p>
					</div>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
