<script lang="ts">
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTableActions from '$lib/components/custom/data-table-actions.svelte';
	import type { ColumnDef } from '@tanstack/table-core';
	import type { Schema } from '$lib/components/schemas.js';

	import CrudPage from '$lib/components/custom/crud-page.svelte';

	let { data } = $props();

	const columns: ColumnDef<Schema>[] = [
		{
			id: 'index',
			header: 'No.',
			cell: ({ row }) => row.index + 1
		},
		{
			accessorKey: 'header',
			header: 'Judul'
		},
		{
			accessorKey: 'status',
			header: 'Status'
		},
		{
			accessorKey: 'limit',
			header: 'Tanggal Posting'
		},
		{
			id: 'actions',
			cell: ({ row }) =>
				renderComponent(DataTableActions, { id: row.original.id, baseUrl: '/admin/postingan' })
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
