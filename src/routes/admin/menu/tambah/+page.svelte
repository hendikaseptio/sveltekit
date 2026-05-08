<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { ArrowLeft, Link, Hash, SortAsc, ExternalLink } from "lucide-svelte";

	let { data, form } = $props();

	let label = $state('');
	let url = $state('');
	let order = $state(0);
	let parentId = $state('');
	let isExternal = $state(false);
</script>

<div class="flex flex-col gap-6 max-w-2xl mx-auto w-full px-4 lg:px-6 py-6">
	<div class="flex items-center gap-4">
		<Button href="/admin/menu" variant="outline" size="icon">
			<ArrowLeft size={18} />
		</Button>
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Tambah Menu</h2>
			<p class="text-muted-foreground">Tambahkan item navigasi baru ke website Anda.</p>
		</div>
	</div>

	{#if form?.error}
		<div class="bg-destructive/10 text-destructive p-4 rounded-lg text-sm border border-destructive/20">
			{form.error}
		</div>
	{/if}

	<form method="POST">
		<Card.Root>
			<Card.Content class="pt-6 space-y-6">
				<div class="space-y-2">
					<Label for="label">
						<Hash size={14} class="inline mr-1" />Label Menu
					</Label>
					<Input id="label" name="label" bind:value={label} placeholder="Contoh: Tentang Kami" required />
				</div>

				<div class="space-y-2">
					<Label for="url">
						<Link size={14} class="inline mr-1" />URL / Path
					</Label>
					<Input id="url" name="url" bind:value={url} placeholder="/tentang-kami atau https://..." required />
					<p class="text-xs text-muted-foreground">Gunakan path relatif (/halaman) atau URL lengkap untuk link eksternal.</p>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="order">
							<SortAsc size={14} class="inline mr-1" />Urutan
						</Label>
						<Input id="order" name="order" type="number" bind:value={order} min="0" />
					</div>

					<div class="space-y-2">
						<Label for="parentId">Menu Induk (opsional)</Label>
						<select
							id="parentId"
							name="parentId"
							bind:value={parentId}
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						>
							<option value="">— Menu Utama —</option>
							{#each data.parentMenus as parent}
								<option value={parent.id}>{parent.label}</option>
							{/each}
						</select>
					</div>
				</div>

				<label class="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-4 cursor-pointer hover:bg-muted/50 transition-colors">
					<div class="flex items-center gap-3">
						<ExternalLink size={18} class="text-muted-foreground" />
						<div>
							<p class="text-sm font-medium">Link Eksternal</p>
							<p class="text-xs text-muted-foreground">Buka di tab baru</p>
						</div>
					</div>
					<div class="relative">
						<input
							type="checkbox"
							bind:checked={isExternal}
							class="sr-only peer"
						/>
						<div class="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors"></div>
						<div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
					</div>
					<input type="hidden" name="isExternal" value={isExternal ? 'true' : 'false'} />
				</label>

				<div class="flex justify-end gap-3 pt-4 border-t">
					<Button variant="ghost" href="/admin/menu">Batal</Button>
					<Button type="submit">Simpan Menu</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</form>
</div>
