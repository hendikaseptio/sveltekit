<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-svelte";
	import type { Column } from "@tanstack/table-core";

	let { column, title }: { column: Column<any, any>, title: string } = $props();

	const sortState = $derived(column.getIsSorted());
</script>

<Button
	variant="ghost"
	size="sm"
	class="-ml-3 h-8 data-[state=open]:bg-accent"
	onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
>
	<span>{title}</span>
	{#if sortState === "asc"}
		<ArrowUp class="ml-2 h-4 w-4" />
	{:else if sortState === "desc"}
		<ArrowDown class="ml-2 h-4 w-4" />
	{:else}
		<ArrowUpDown class="ml-2 h-4 w-4" />
	{/if}
</Button>
