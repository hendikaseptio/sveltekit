<script lang="ts">
	import {
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type Row,
		type RowSelectionState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	import type { Schema } from './schemas.js';
	import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
	import { createSvelteTable } from '$lib/components/ui/data-table/data-table.svelte.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { FlexRender, renderComponent } from '$lib/components/ui/data-table/index.js';
	import {
		Columns,
		ChevronDown,
		Plus,
		ChevronsLeft,
		ChevronLeft,
		ChevronRight,
		ChevronsRight
	} from 'lucide-svelte';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import DataTableCellViewer from './data-table-cell-viewer.svelte';
	import DataTableReviewer from './data-table-reviewer.svelte';
	import DataTableActions from './data-table-actions.svelte';
	import DataTableDragHandle from './data-table-drag-handle.svelte';
	import DataTableType from './data-table-type.svelte';
	import DataTableStatus from './data-table-status.svelte';
	import DataTableTarget from './data-table-target.svelte';
	import DataTableLimit from './data-table-limit.svelte';
	import DataTableHeaderTarget from './data-table-header-target.svelte';
	import DataTableHeaderLimit from './data-table-header-limit.svelte';
	import { DragDropProvider } from '@dnd-kit-svelte/svelte';
	import { move } from '@dnd-kit/helpers';
	import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
	import { Badge } from '$lib/components/ui/badge/index.js';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Search } from 'lucide-svelte';

	let {
		data,
		baseUrl = '/admin/postingan',
		columns: columnsProp,
		searchKey = 'header',
		searchPlaceholder = 'Cari data...'
	}: {
		data: any[];
		baseUrl?: string;
		columns?: ColumnDef<any>[];
		searchKey?: string;
		searchPlaceholder?: string;
	} = $props();

	const defaultColumns: ColumnDef<any>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
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
			id: 'actions',
			cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id, baseUrl })
		}
	];

	const columns = $derived(columnsProp ?? defaultColumns);
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		getRowId: (row) => row.id.toString(),
		enableRowSelection: true,
		autoResetPageIndex: false,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		}
	});
</script>

<div class="flex w-full flex-col gap-4">
	<div class="flex items-center justify-between gap-4 px-4 lg:px-6">
		<div class="relative max-w-sm flex-1">
			<Search class="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder={searchPlaceholder}
				class="pl-9"
				value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
				oninput={(e) => table.getColumn(searchKey)?.setFilterValue(e.currentTarget.value)}
			/>
		</div>
		<div class="flex items-center gap-2"></div>
	</div>

	<div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
		<div class="overflow-hidden rounded-lg border">
			<Table.Root>
				<Table.Header class="sticky top-0 z-10 bg-muted">
					{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
						<Table.Row>
							{#each headerGroup.headers as header (header.id)}
								<Table.Head colspan={header.colSpan}>
									{#if !header.isPlaceholder}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{/if}
								</Table.Head>
							{/each}
						</Table.Row>
					{/each}
				</Table.Header>
				<Table.Body class="**:data-[slot=table-cell]:first:w-8">
					{#if table.getRowModel().rows?.length}
						{#each table.getRowModel().rows as row (row.id)}
							<Table.Row data-state={row.getIsSelected() && 'selected'}>
								{#each row.getVisibleCells() as cell (cell.id)}
									<Table.Cell>
										<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
									</Table.Cell>
								{/each}
							</Table.Row>
						{/each}
					{:else}
						<Table.Row>
							<Table.Cell colspan={columns.length} class="h-24 text-center">
								Tidak ada hasil.
							</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		</div>

		<div class="flex items-center justify-between px-4 pb-4">
			<div class="hidden flex-1 text-sm text-muted-foreground lg:flex">
				{table.getFilteredSelectedRowModel().rows.length} dari
				{table.getFilteredRowModel().rows.length} baris dipilih.
			</div>
			<div class="flex w-full items-center gap-8 lg:w-fit">
				<div class="hidden items-center gap-2 lg:flex">
					<Label for="rows-per-page" class="text-sm font-medium">Baris per halaman</Label>
					<Select.Root
						type="single"
						bind:value={
							() => `${table.getState().pagination.pageSize}`, (v) => table.setPageSize(Number(v))
						}
					>
						<Select.Trigger size="sm" class="w-20" id="rows-per-page">
							{table.getState().pagination.pageSize}
						</Select.Trigger>
						<Select.Content side="top">
							{#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
								<Select.Item value={pageSize.toString()}>
									{pageSize}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex w-fit items-center justify-center text-sm font-medium">
					Halaman {table.getState().pagination.pageIndex + 1} dari
					{table.getPageCount()}
				</div>
				<div class="ms-auto flex items-center gap-2 lg:ms-0">
					<Button
						variant="outline"
						class="size-8"
						size="icon"
						onclick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span class="sr-only">Halaman sebelumnya</span>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						class="size-8"
						size="icon"
						onclick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span class="sr-only">Halaman berikutnya</span>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
