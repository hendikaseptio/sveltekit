<script lang="ts">
	import DataTable from './data-table.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import type { ColumnDef } from "@tanstack/table-core";

	let { 
		title, 
		description, 
		addLink, 
		addLabel = "Tambah Data",
		data,
		columns,
		baseUrl,
		searchKey,
		searchPlaceholder,
		extraHeader = null
	}: {
		title: string;
		description: string;
		addLink?: string;
		addLabel?: string;
		data: any[];
		columns: ColumnDef<any>[];
		baseUrl: string;
		searchKey?: string;
		searchPlaceholder?: string;
		extraHeader?: import('svelte').Snippet;
	} = $props();
</script>

<div class="flex flex-col gap-6 py-6">
	<div class="flex items-center justify-between px-4 lg:px-6">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">{title}</h2>
			<p class="text-muted-foreground">{description}</p>
		</div>
		<div class="flex items-center gap-3">
			{@render extraHeader?.()}
			{#if addLink}
				<Button href={addLink} class="gap-2">
					<Plus size={18} />
					{addLabel}
				</Button>
			{/if}
		</div>
	</div>

	<DataTable 
		{data} 
		{columns} 
		{baseUrl} 
		{searchKey} 
		{searchPlaceholder} 
	/>
</div>
