<script lang="ts">
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableActions from '$lib/components/custom/data-table-actions.svelte';
	import type { ColumnDef, Row, Column } from '@tanstack/table-core';
	import type { Schema } from '$lib/components/schemas.js';

	import CrudPage from '$lib/components/custom/crud-page.svelte';
	import DataTableSortableHeader from '$lib/components/custom/data-table-sortable-header.svelte';

	let { data } = $props();

	const columns: ColumnDef<Schema>[] = [
		{
			id: 'index',
			header: ({ column }: { column: Column<Schema, unknown> }) =>
				renderComponent(DataTableSortableHeader, { column, title: 'No.' }),
			cell: ({ row }: { row: Row<Schema> }) => row.index + 1
		},
		{
			accessorKey: 'header',
			header: ({ column }: { column: Column<Schema, unknown> }) =>
				renderComponent(DataTableSortableHeader, { column, title: 'Judul' })
		},
		{
			accessorKey: 'status',
			header: ({ column }: { column: Column<Schema, unknown> }) =>
				renderComponent(DataTableSortableHeader, { column, title: 'Status' })
		},
		{
			accessorKey: 'limit',
			header: ({ column }: { column: Column<Schema, unknown> }) =>
				renderComponent(DataTableSortableHeader, { column, title: 'Tanggal Posting' })
		},
		{
			id: 'actions',
			cell: ({ row }: { row: Row<Schema> }) =>
				renderComponent(DataTableActions, { 
					id: row.original.id, 
					baseUrl: '/admin/postingan', 
					viewUrl: row.original.target 
				})
		}
	];
</script>

<CrudPage
	title="Postingan"
	description="Kelola semua artikel dan berita di sini."
	addLink="/admin/postingan/tambah"
	addLabel="Buat Postingan"
	data={data.posts}
	{columns}
	baseUrl="/admin/postingan"
	searchKey="header"
	searchPlaceholder="Cari postingan..."
/>
