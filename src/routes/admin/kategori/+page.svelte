<script lang="ts">
	import DataTable from '$lib/components/custom/data-table.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { renderComponent } from "$lib/components/ui/data-table/index.js";
	import DataTableActions from '$lib/components/custom/data-table-actions.svelte';
	import type { ColumnDef } from "@tanstack/table-core";
	import type { Schema } from "$lib/components/schemas.js";

	let { data } = $props();

	const columns: ColumnDef<Schema>[] = [
		{
			id: "index",
			header: "No.",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "header",
			header: "Nama Kategori",
		},
		{
			accessorKey: "target",
			header: "Slug Kategori",
		},
		{
			accessorKey: "limit",
			header: "Tanggal Dibuat",
		},
		{
			id: "actions",
			cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id, baseUrl: "/admin/kategori" }),
		},
	];
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center justify-between px-4 lg:px-6">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Kategori</h2>
			<p class="text-muted-foreground">Kelola kategori untuk mengelompokkan postingan Anda.</p>
		</div>
		<Button href="/admin/kategori/tambah" class="gap-2">
			<Plus size={18} />
			Tambah Kategori
		</Button>
	</div>

	<DataTable 
		data={data.categories} 
		{columns} 
		baseUrl="/admin/kategori" 
		searchKey="header" 
		searchPlaceholder="Cari kategori..." 
	/>
</div>
