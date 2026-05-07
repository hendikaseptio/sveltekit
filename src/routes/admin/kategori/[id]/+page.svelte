<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Card from "$lib/components/ui/card";
	import { ArrowLeft } from "lucide-svelte";

	let { data, form } = $props();
	
	let name = $state(data.category.name);
	let slug = $state(data.category.slug);
	let description = $state(data.category.description ?? '');
</script>

<div class="flex flex-col gap-6 max-w-2xl mx-auto w-full px-4 lg:px-6 py-6">
	<div class="flex items-center gap-4">
		<Button href="/admin/kategori" variant="outline" size="icon">
			<ArrowLeft size={18} />
		</Button>
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Edit Kategori</h2>
			<p class="text-muted-foreground">Perbarui informasi kategori.</p>
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
					<Label for="name">Nama Kategori</Label>
					<Input id="name" name="name" bind:value={name} placeholder="Contoh: Teknologi" required />
				</div>

				<div class="space-y-2">
					<Label for="slug">Slug</Label>
					<Input id="slug" name="slug" bind:value={slug} placeholder="teknologi" required />
				</div>

				<div class="space-y-2">
					<Label for="description">Deskripsi (Optional)</Label>
					<Textarea id="description" name="description" bind:value={description} placeholder="Deskripsi singkat kategori..." />
				</div>

				<div class="flex justify-end gap-3 pt-4">
					<Button variant="ghost" href="/admin/kategori">Batal</Button>
					<Button type="submit">Simpan Perubahan</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
