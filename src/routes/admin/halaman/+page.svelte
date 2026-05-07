<script lang="ts">
	import { renderComponent } from "$lib/components/ui/data-table/index.js";
	import DataTableActions from '$lib/components/custom/data-table-actions.svelte';
	import type { ColumnDef } from "@tanstack/table-core";
	import type { Schema } from "$lib/components/schemas.js";
	import CrudPage from '$lib/components/custom/crud-page.svelte';

	let { data } = $props();

	const columns: ColumnDef<Schema>[] = [
		{
			id: "index",
			header: "No.",
			cell: ({ row }) => row.index + 1,
		},
		{
			accessorKey: "header",
			header: "Judul Halaman",
		},
		{
			accessorKey: "target",
			header: "Slug",
		},
		{
			accessorKey: "limit",
			header: "Tanggal Dibuat",
		},
		{
			id: "actions",
			cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id, baseUrl: "/admin/halaman" }),
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
