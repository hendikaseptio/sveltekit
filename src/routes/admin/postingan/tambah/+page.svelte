<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { ArrowLeft, Image as ImageIcon, Calendar, Send } from "lucide-svelte";
	import TextEditor from "$lib/components/custom/text-editor.svelte";

	let { form } = $props();

	let contentHtml = $state('');
	let status = $state('draft');
	let publishedAt = $state(new Date().toISOString().slice(0, 16));
</script>

<div class="flex flex-col gap-6 max-w-5xl mx-auto w-full px-4 lg:px-6 py-6">
	<div class="flex items-center gap-4">
		<Button href="/admin/postingan" variant="outline" size="icon">
			<ArrowLeft size={18} />
		</Button>
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Tambah Postingan</h2>
			<p class="text-muted-foreground">Buat artikel baru untuk dipublikasikan.</p>
		</div>
	</div>

	{#if form?.error}
		<div class="bg-destructive/10 text-destructive p-4 rounded-lg text-sm border border-destructive/20">
			{form.error}
		</div>
	{/if}

	<form method="POST" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2 space-y-6">
			<Card.Root>
				<Card.Content class="pt-6 space-y-6">
					<div class="space-y-2">
						<Label for="title">Judul Postingan</Label>
						<Input id="title" name="title" placeholder="Masukkan judul menarik..." required class="text-lg font-semibold" />
					</div>

					<div class="space-y-2">
						<Label for="excerpt">Ringkasan (Optional)</Label>
						<Input id="excerpt" name="excerpt" placeholder="Ringkasan singkat artikel..." />
					</div>

					<div class="space-y-2">
						<Label>Konten Artikel</Label>
						<TextEditor bind:value={contentHtml} placeholder="Tulis isi artikel Anda di sini..." />
						<input type="hidden" name="content" bind:value={contentHtml} />
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="space-y-6">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-sm font-medium">Publikasi</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="space-y-2">
						<Label for="status">Status</Label>
						<Select.Root type="single" name="status" bind:value={status}>
							<Select.Trigger class="w-full">
								{status === 'published' ? 'Published' : 'Draft'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="draft">Draft</Select.Item>
								<Select.Item value="published">Published</Select.Item>
							</Select.Content>
						</Select.Root>
						<input type="hidden" name="status" value={status} />
					</div>

					<div class="space-y-2">
						<Label for="publishedAt">Jadwalkan Publikasi</Label>
						<div class="relative">
							<Calendar class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input type="datetime-local" id="publishedAt" name="publishedAt" bind:value={publishedAt} class="pl-10" />
						</div>
					</div>

					<div class="pt-2">
						<Button type="submit" class="w-full">
							<Send class="mr-2 h-4 w-4" />
							Simpan Postingan
						</Button>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-sm font-medium">Cover Image</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="aspect-video rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50 overflow-hidden relative">
						{#if form?.cover || ""}
							<img src={form.cover} alt="Cover" class="w-full h-full object-cover" />
						{:else}
							<div class="flex flex-col items-center gap-2 text-muted-foreground">
								<ImageIcon size={32} />
								<span class="text-[10px]">No Image Selected</span>
							</div>
						{/if}
					</div>
					<div class="space-y-2">
						<Label for="cover">URL Cover (Media Library)</Label>
						<Input id="cover" name="cover" placeholder="/uploads/image.jpg" />
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</form>
</div>
