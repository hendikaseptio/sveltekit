<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { ArrowLeft } from "lucide-svelte";
	import TextEditor from "$lib/components/custom/text-editor.svelte";

	let { form } = $props();
	
	let title = $state('');
	let slug = $state('');
	let contentHtml = $state('');

	$effect(() => {
		if (title) {
			slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
		}
	});
</script>

<div class="flex flex-col gap-6 max-w-4xl mx-auto w-full px-4 lg:px-6 py-6">
	<div class="flex items-center gap-4">
		<Button href="/admin/halaman" variant="outline" size="icon">
			<ArrowLeft size={18} />
		</Button>
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Tambah Halaman</h2>
			<p class="text-muted-foreground">Buat halaman statis baru.</p>
		</div>
	</div>

	{#if form?.error}
		<div class="bg-destructive/10 text-destructive p-4 rounded-lg text-sm border border-destructive/20">
			{form.error}
		</div>
	{/if}

	<Card.Root>
		<Card.Content class="pt-6">
			<form method="POST" class="space-y-6">
				<div class="space-y-2">
					<Label for="title">Judul Halaman</Label>
					<Input id="title" name="title" bind:value={title} placeholder="Contoh: Tentang Kami" required />
				</div>

				<div class="space-y-2">
					<Label for="slug">Slug</Label>
					<Input id="slug" name="slug" bind:value={slug} placeholder="tentang-kami" required />
				</div>

				<div class="space-y-2">
					<Label>Konten Halaman</Label>
					<TextEditor bind:value={contentHtml} placeholder="Tulis isi halaman di sini..." />
					<input type="hidden" name="content" bind:value={contentHtml} />
				</div>

				<div class="flex justify-end gap-3 pt-4">
					<Button variant="ghost" href="/admin/halaman">Batal</Button>
					<Button type="submit">Simpan Halaman</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
