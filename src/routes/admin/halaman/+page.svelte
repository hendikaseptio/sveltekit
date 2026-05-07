<script lang="ts">
	import { renderComponent } from "$lib/components/ui/data-table/index.js";
	import DataTableActions from '$lib/components/custom/data-table-actions.svelte';
	import type { ColumnDef, Row, Column } from "@tanstack/table-core";
	import type { Schema } from "$lib/components/schemas.js";
	import CrudPage from '$lib/components/custom/crud-page.svelte';
	import DataTableSortableHeader from '$lib/components/custom/data-table-sortable-header.svelte';

	let { data } = $props();

	const columns: ColumnDef<Schema>[] = [
		{
			id: "index",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'No.' }),
			cell: ({ row }: { row: Row<Schema> }) => row.index + 1,
		},
		{
			accessorKey: "header",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Judul Halaman' })
		},
		{
			accessorKey: "target",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Slug' })
		},
		{
			accessorKey: "limit",
			header: ({ column }: { column: Column<Schema, unknown> }) => renderComponent(DataTableSortableHeader, { column, title: 'Tanggal Dibuat' })
		},
		{
			id: "actions",
			cell: ({ row }: { row: Row<Schema> }) => renderComponent(DataTableActions, { id: row.original.id, baseUrl: "/admin/halaman" }),
		},
	];
</script>

<CrudPage
	title="Halaman"
	description="Kelola halaman statis seperti Tentang Kami, Kontak, dll."
	addLink="/admin/halaman/tambah"
	addLabel="Tambah Halaman"
	data={data.pages}
	{columns}
	baseUrl="/admin/halaman"
	searchKey="header"
	searchPlaceholder="Cari halaman..."
/>
