<script lang="ts">
	import ImageUpload from "$lib/components/custom/image-upload.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { ArrowLeft, Image as ImageIcon, Calendar, Send, Tag } from "lucide-svelte";
	import TextEditor from "$lib/components/custom/text-editor.svelte";

	let { data, form } = $props();

	let contentHtml = $state('');
	let status = $state('draft');
	let publishedAt = $state(new Date().toISOString().slice(0, 16));
	let cover = $state('');
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
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Kategori</Card.Title>
					<Tag class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
						{#each data.categories as cat}
							<div class="flex items-center space-x-2">
								<Checkbox id="cat-{cat.id}" name="categories" value={cat.id} />
								<Label for="cat-{cat.id}" class="text-sm font-normal cursor-pointer hover:text-primary transition-colors">
									{cat.name}
								</Label>
							</div>
						{:else}
							<p class="text-xs text-muted-foreground italic">Belum ada kategori.</p>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-sm font-medium">Cover Image</Card.Title>
				</Card.Header>
				<Card.Content>
					<ImageUpload bind:value={cover} name="cover" label="" maxSizeKB={500} />
				</Card.Content>
			</Card.Root>
		</div>
	</form>
</div>
