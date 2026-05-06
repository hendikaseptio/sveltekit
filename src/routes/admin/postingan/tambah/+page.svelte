<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { IconArrowLeft } from "@tabler/icons-svelte";

	let { form } = $props();
</script>

<div class="flex flex-col gap-6 max-w-4xl mx-auto w-full px-4 lg:px-6">
	<div class="flex items-center gap-4">
		<Button href="/admin/postingan" variant="outline" size="icon">
			<IconArrowLeft size={18} />
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

	<Card.Root>
		<Card.Content class="pt-6">
			<form method="POST" class="space-y-6">
				<div class="space-y-2">
					<Label for="title">Judul Postingan</Label>
					<Input id="title" name="title" placeholder="Masukkan judul menarik..." required />
				</div>

				<div class="space-y-2">
					<Label for="excerpt">Ringkasan (Optional)</Label>
					<Input id="excerpt" name="excerpt" placeholder="Ringkasan singkat artikel..." />
				</div>

				<div class="space-y-2">
					<Label for="content">Konten Artikel</Label>
					<Textarea id="content" name="content" rows={12} placeholder="Tuliskan isi artikel Anda di sini..." required />
				</div>

				<div class="flex justify-end gap-3 pt-4">
					<Button variant="ghost" href="/admin/postingan">Batal</Button>
					<Button type="submit">Simpan & Publikasikan</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
