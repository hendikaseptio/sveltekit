<script lang="ts">
	import { renderComponent } from "$lib/components/ui/data-table/index.js";
	import DataTableActions from '$lib/components/custom/data-table-actions.svelte';
	import type { ColumnDef, Row, Column } from "@tanstack/table-core";
	import type { Schema } from "$lib/components/schemas.js";
	import CrudPage from '$lib/components/custom/crud-page.svelte';
	import DataTableSortableHeader from '$lib/components/custom/data-table-sortable-header.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { renderSnippet } from '$lib/components/ui/data-table/index.js';

	let { data } = $props();

	const columns: ColumnDef<Schema>[] = [
		{
			id: "index",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'No.' }),
			cell: ({ row }: { row: Row<Schema> }) => row.index + 1,
		},
		{
			accessorKey: "header",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Label' })
		},
		{
			accessorKey: "target",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'URL' })
		},
		{
			accessorKey: "type",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Tipe' })
		},
		{
			accessorKey: "reviewer",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Level' })
		},
		{
			accessorKey: "limit",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Urutan' })
		},
		{
			id: "actions",
			cell: ({ row }: { row: Row<Schema> }) => renderComponent(DataTableActions, {
				id: row.original.id,
				baseUrl: "/admin/menu"
			}),
		},
	];
</script>

<CrudPage
	title="Menu"
	description="Kelola navigasi website Anda."
	addLink="/admin/menu/tambah"
	addLabel="Tambah Menu"
	data={data.menus}
	{columns}
	baseUrl="/admin/menu"
	searchKey="header"
	searchPlaceholder="Cari menu..."
/>
