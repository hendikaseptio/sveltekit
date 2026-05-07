<script lang="ts"> 
	import type { Editor } from 'prosekit/core';
	import type { TableExtension } from 'prosekit/extensions/table';
	import { useEditorDerivedValue } from 'prosekit/svelte';
	import { MenuItem, MenuPopup, MenuPositioner } from 'prosekit/svelte/menu';
	import { 
		TableHandleColumnMenuRoot, TableHandleColumnMenuTrigger, TableHandleColumnPopup, TableHandleColumnPositioner, 
		TableHandleDragPreview, TableHandleDropIndicator, TableHandleRoot, TableHandleRowMenuRoot, 
		TableHandleRowMenuTrigger, TableHandleRowPopup, TableHandleRowPositioner, 
	} from 'prosekit/svelte/table-handle';
	import { GripHorizontal, GripVertical } from 'lucide-svelte';
	
	function getTableHandleState(editor: Editor<TableExtension>) { 
		return { 
			addTableColumnBefore: { 
				canExec: editor.commands.addTableColumnBefore.canExec(), 
				command: () => editor.commands.addTableColumnBefore(), 
			}, 
			addTableColumnAfter: { 
				canExec: editor.commands.addTableColumnAfter.canExec(), 
				command: () => editor.commands.addTableColumnAfter(), 
			}, 
			deleteCellSelection: { 
				canExec: editor.commands.deleteCellSelection.canExec(), 
				command: () => editor.commands.deleteCellSelection(), 
			}, 
			deleteTableColumn: { 
				canExec: editor.commands.deleteTableColumn.canExec(), 
				command: () => editor.commands.deleteTableColumn(), 
			}, 
			addTableRowAbove: { 
				canExec: editor.commands.addTableRowAbove.canExec(), 
				command: () => editor.commands.addTableRowAbove(), 
			}, 
			addTableRowBelow: { 
				canExec: editor.commands.addTableRowBelow.canExec(), 
				command: () => editor.commands.addTableRowBelow(), 
			}, 
			deleteTableRow: { 
				canExec: editor.commands.deleteTableRow.canExec(), 
				command: () => editor.commands.deleteTableRow(), 
			}, 
			deleteTable: { 
				canExec: editor.commands.deleteTable.canExec(), 
				command: () => editor.commands.deleteTable(), 
			}, 
		};
	} 
	
	interface Props { dir?: 'ltr' | 'rtl' } 
	const props: Props = $props();
	const state = useEditorDerivedValue(getTableHandleState);
</script> 

<TableHandleRoot> 
	<TableHandleDragPreview /> 
	<TableHandleDropIndicator /> 
	
	<TableHandleColumnPositioner class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"> 
		<TableHandleColumnPopup class="translate-y-[50%] flex box-border origin-bottom transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95"> 
			<TableHandleColumnMenuRoot> 
				<TableHandleColumnMenuTrigger class="h-4.5 w-6 flex items-center box-border justify-center bg-background hover:bg-muted rounded-sm text-muted-foreground/50 hover:text-foreground border border-border p-0 transition-colors overflow-clip cursor-pointer"> 
					<GripHorizontal size={16} /> 
				</TableHandleColumnMenuTrigger> 
				
				<MenuPositioner class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"> 
					<MenuPopup class="box-border origin-top transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-md border border-border shadow-lg bg-background relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none text-sm"> 
						{#if $state.addTableColumnBefore.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden" onSelect={$state.addTableColumnBefore.command}> 
								<span>Insert Left</span> 
							</MenuItem> 
						{/if} 
						{#if $state.addTableColumnAfter.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden" onSelect={$state.addTableColumnAfter.command}> 
								<span>Insert Right</span> 
							</MenuItem> 
						{/if} 
						<div class="h-px bg-border my-1"></div>
						{#if $state.deleteCellSelection.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden text-destructive" onSelect={$state.deleteCellSelection.command}> 
								<span>Clear Contents</span> 
							</MenuItem> 
						{/if} 
						{#if $state.deleteTableColumn.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden text-destructive" onSelect={$state.deleteTableColumn.command}> 
								<span>Delete Column</span> 
							</MenuItem> 
						{/if} 
						{#if $state.deleteTable.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden text-destructive" onSelect={$state.deleteTable.command}> 
								<span>Delete Table</span> 
							</MenuItem> 
						{/if} 
					</MenuPopup> 
				</MenuPositioner> 
			</TableHandleColumnMenuRoot> 
		</TableHandleColumnPopup> 
	</TableHandleColumnPositioner> 
	
	<TableHandleRowPositioner placement={props.dir === 'rtl' ? 'right' : 'left'} class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"> 
		<TableHandleRowPopup class="ltr:translate-x-[50%] rtl:translate-x-[-50%] flex box-border origin-right transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95"> 
			<TableHandleRowMenuRoot> 
				<TableHandleRowMenuTrigger class="h-6 w-4.5 flex items-center box-border justify-center bg-background hover:bg-muted rounded-sm text-muted-foreground/50 hover:text-foreground border border-border p-0 transition-colors overflow-clip cursor-pointer"> 
					<GripVertical size={16} /> 
				</TableHandleRowMenuTrigger> 
				
				<MenuPositioner class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"> 
					<MenuPopup class="box-border origin-left transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-md border border-border shadow-lg bg-background relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none text-sm"> 
						{#if $state.addTableRowAbove.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden" onSelect={$state.addTableRowAbove.command}> 
								<span>Insert Above</span> 
							</MenuItem> 
						{/if} 
						{#if $state.addTableRowBelow.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden" onSelect={$state.addTableRowBelow.command}> 
								<span>Insert Below</span> 
							</MenuItem> 
						{/if} 
						<div class="h-px bg-border my-1"></div>
						{#if $state.deleteCellSelection.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden text-destructive" onSelect={$state.deleteCellSelection.command}> 
								<span>Clear Contents</span> 
							</MenuItem> 
						{/if} 
						{#if $state.deleteTableRow.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden text-destructive" onSelect={$state.deleteTableRow.command}> 
								<span>Delete Row</span> 
							</MenuItem> 
						{/if} 
						{#if $state.deleteTable.canExec} 
							<MenuItem class="relative min-w-32 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:opacity-50 hover:bg-muted cursor-pointer outline-hidden text-destructive" onSelect={$state.deleteTable.command}> 
								<span>Delete Table</span> 
							</MenuItem> 
						{/if} 
					</MenuPopup> 
				</MenuPositioner> 
			</TableHandleRowMenuRoot> 
		</TableHandleRowPopup> 
	</TableHandleRowPositioner> 
</TableHandleRoot>
