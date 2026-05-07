<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { 
		Image as ImageIcon, 
		Upload, 
		X, 
		Copy, 
		Check, 
		Loader2,
		ClipboardPaste
	} from "lucide-svelte";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import { deserialize } from "$app/forms";

	let { 
		value = $bindable(""), 
		name = "image", 
		label = "Upload Gambar",
		maxSizeKB = 500
	} = $props();

	let isDragging = $state(false);
	let isUploading = $state(false);
	let fileInput: HTMLInputElement;
	let copied = $state(false);

	async function compressImage(file: File): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				const img = new Image();
				img.src = event.target?.result as string;
				img.onload = () => {
					const canvas = document.createElement("canvas");
					let width = img.width;
					let height = img.height;

					// Optional: Limit max dimensions to speed up and reduce size
					const maxDim = 1920;
					if (width > maxDim || height > maxDim) {
						if (width > height) {
							height = (height / width) * maxDim;
							width = maxDim;
						} else {
							width = (width / height) * maxDim;
							height = maxDim;
						}
					}

					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext("2d");
					ctx?.drawImage(img, 0, 0, width, height);

					let quality = 0.9;
					const attemptCompression = () => {
						canvas.toBlob(
							(blob) => {
								if (!blob) return reject("Compression failed");
								
								if (blob.size / 1024 > maxSizeKB && quality > 0.1) {
									quality -= 0.1;
									attemptCompression();
								} else {
									resolve(blob);
								}
							},
							"image/jpeg",
							quality
						);
					};
					attemptCompression();
				};
			};
			reader.onerror = (error) => reject(error);
		});
	}

	async function handleFile(file: File) {
		if (!file.type.startsWith("image/")) {
			toast.error("Hanya file gambar yang diperbolehkan");
			return;
		}

		isUploading = true;
		try {
			toast.info("Mengompresi gambar...");
			const compressedBlob = await compressImage(file);
			
			const formData = new FormData();
			formData.append("files", compressedBlob, file.name);

			toast.info("Mengupload gambar...");
			const response = await fetch("/admin/media?/upload", {
				method: "POST",
				body: formData,
				headers: {
					'x-sveltekit-action': 'true'
				}
			});

			const result = deserialize(await response.text());
			
			if (result.type === 'success' && result.data?.uploaded?.[0]?.path) {
				value = result.data.uploaded[0].path;
				toast.success("Gambar berhasil diupload");
			} else if (result.type === 'failure') {
				throw new Error(result.data?.error || "Upload gagal");
			} else {
				throw new Error("Format respon tidak dikenal");
			}
		} catch (error) {
			console.error(error);
			toast.error("Gagal memproses gambar");
		} finally {
			isUploading = false;
		}
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		const file = e.dataTransfer?.files[0];
		if (file) handleFile(file);
	}

	function onPaste(e: ClipboardEvent) {
		const file = e.clipboardData?.files[0];
		if (file && file.type.startsWith("image/")) {
			handleFile(file);
		}
	}

	function copyLink() {
		if (!value) return;
		const fullUrl = window.location.origin + value;
		navigator.clipboard.writeText(fullUrl);
		copied = true;
		toast.success("Link berhasil disalin");
		setTimeout(() => (copied = false), 2000);
	}

	function clearImage() {
		value = "";
	}
</script>

<div class="space-y-3">
	{#if label}
		<Label>{label}</Label>
	{/if}

	<div
		class="relative group aspect-video rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center overflow-hidden bg-muted/30
		{isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'}"
		ondragover={(e) => { e.preventDefault(); isDragging = true; }}
		ondragleave={() => isDragging = false}
		ondrop={onDrop}
		onpaste={onPaste}
		tabindex="0"
		role="button"
		aria-label="Dropzone"
	>
		{#if value}
			<img src={value} alt="Preview" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
			<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
				<Button variant="secondary" size="icon" onclick={copyLink} title="Salin Link">
					{#if copied}
						<Check size={18} class="text-green-500" />
					{:else}
						<Copy size={18} />
					{/if}
				</Button>
				<Button variant="destructive" size="icon" onclick={clearImage} title="Hapus">
					<X size={18} />
				</Button>
			</div>
		{:else if isUploading}
			<div class="flex flex-col items-center gap-3">
				<Loader2 class="animate-spin text-primary" size={40} />
				<span class="text-sm font-medium text-muted-foreground">Memproses...</span>
			</div>
		{:else}
			<div class="flex flex-col items-center gap-3 p-6 text-center">
				<div class="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
					<Upload size={24} />
				</div>
				<div class="space-y-1">
					<p class="text-sm font-medium">Klik atau drop gambar di sini</p>
					<p class="text-xs text-muted-foreground">Mendukung Paste (Ctrl+V) & Max {maxSizeKB}KB</p>
				</div>
				<Button variant="outline" size="sm" onclick={() => fileInput.click()}>
					Pilih File
				</Button>
			</div>
		{/if}

		<input
			type="file"
			accept="image/*"
			class="hidden"
			bind:this={fileInput}
			onchange={(e) => {
				const file = e.currentTarget.files?.[0];
				if (file) handleFile(file);
			}}
		/>
	</div>

	{#if value}
		<div class="flex items-center gap-2">
			<Input value={value} readonly class="h-8 text-xs bg-muted/50" />
			<input type="hidden" {name} value={value} />
			<Button variant="ghost" size="sm" class="h-8 px-2" onclick={copyLink}>
				<Copy size={14} class="mr-1" />
				Copy
			</Button>
		</div>
	{/if}
</div>
