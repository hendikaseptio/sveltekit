<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { goto } from "$app/navigation";
	import { MoreVertical } from "lucide-svelte";

	let { 
		id, 
		baseUrl = "/admin/postingan",
		viewUrl = "" 
	}: { id: string | number, baseUrl?: string, viewUrl?: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="data-[state=open]:bg-muted text-muted-foreground flex size-8">
		{#snippet child({ props })}
			<Button variant="ghost" size="icon" {...props}>
				<MoreVertical />
				<span class="sr-only">Open menu</span>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-32">
		<DropdownMenu.Item onSelect={() => goto(`${baseUrl}/${id}`)}>
			Edit
		</DropdownMenu.Item>
		{#if viewUrl}
			<DropdownMenu.Item onSelect={() => window.open(viewUrl, '_blank')}>
				Lihat
			</DropdownMenu.Item>
		{/if}
		<DropdownMenu.Item>Make a copy</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<form method="POST" action="?/delete">
			<input type="hidden" name="id" value={id} />
			<DropdownMenu.Item variant="destructive" onSelect={(e) => {
				if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) {
					e.preventDefault();
					return;
				}
				e.currentTarget.closest('form')?.submit();
			}}>
				Hapus
			</DropdownMenu.Item>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
