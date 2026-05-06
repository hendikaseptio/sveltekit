<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Button } from "$lib/components/ui/button";
	import { 
		IconArrowBackUp, IconArrowForwardUp, 
		IconBold, IconItalic, IconUnderline, IconStrikethrough, 
		IconCode,
		IconH1, IconH2, IconH3, 
		IconQuote, IconList, IconListNumbers, IconListCheck,
		IconMinus,
		IconPlus, IconGripVertical,
		IconPhoto, IconTable
	} from "@tabler/icons-svelte";
	
	// ProseKit imports
	import 'prosekit/basic/style.css';
	import 'prosekit/basic/typography.css';
	import { defineBasicExtension } from 'prosekit/basic';
	import { createEditor, htmlFromNode, union } from 'prosekit/core';
	import { ProseKit, useDocChange, defineSvelteNodeView, type SvelteNodeViewComponent } from 'prosekit/svelte';
	import { defineImageUploadHandler } from 'prosekit/extensions/image';
	import type { Uploader } from 'prosekit/extensions/file';
	
	// Custom Components
	import ImageView from './image-view.svelte';
	import TableHandle from './table-handle.svelte';
	import { 
		BlockHandleAdd, BlockHandleDraggable, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot 
	} from 'prosekit/svelte/block-handle';
	import { DropIndicator } from 'prosekit/svelte/drop-indicator';

	interface Props {
		value?: string;
		placeholder?: string;
	}

	let { value = $bindable(''), placeholder = 'Mulai menulis...' }: Props = $props();

	let fileInput: HTMLInputElement;

	// Mock uploader that reads file as data URL (Base64) to be displayed instantly.
	// In production, you would upload this file to your S3/Cloudinary/backend and return the public URL.
	const dummyUploader: Uploader<string> = async ({ file, onProgress }) => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setTimeout(() => {
					resolve(e.target?.result as string);
				}, 500); // Simulate network delay
			};
			let progress = 0;
			const interval = setInterval(() => {
				progress += 20;
				onProgress({ loaded: progress, total: 100 });
				if (progress >= 100) clearInterval(interval);
			}, 100);
			reader.readAsDataURL(file);
		});
	};

	// Initialize editor directly (ProseKit is SSR safe)
	const extension = union(
		defineBasicExtension(),
		...(browser ? [defineSvelteNodeView({
			name: 'image',
			component: ImageView as SvelteNodeViewComponent,
		})] : []),
		defineImageUploadHandler({
			uploader: dummyUploader
		})
	);
	
	const editor = createEditor({ 
		extension,
		defaultContent: value 
	});

	// Sync document changes to HTML
	useDocChange((doc) => {
		value = htmlFromNode(doc);
	}, { editor });

	function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			editor.commands.uploadImage({ file, uploader: dummyUploader });
			target.value = ''; // reset
		}
	}
</script>

<div class="rounded-md border border-input bg-background overflow-hidden focus-within:ring-1 focus-within:ring-ring">
	<!-- Toolbar UI -->
	<div class="flex items-center gap-1 border-b p-1 bg-muted/30 flex-wrap">
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.undo()} title="Undo">
			<IconArrowBackUp size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.redo()} title="Redo">
			<IconArrowForwardUp size={18} />
		</Button>
		<div class="w-px h-6 bg-border mx-1"></div>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleBold()} title="Bold">
			<IconBold size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleItalic()} title="Italic">
			<IconItalic size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleUnderline()} title="Underline">
			<IconUnderline size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleStrike()} title="Strikethrough">
			<IconStrikethrough size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleCode()} title="Code">
			<IconCode size={18} />
		</Button>
		<div class="w-px h-6 bg-border mx-1"></div>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleHeading({ level: 1 })} title="Heading 1">
			<IconH1 size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleHeading({ level: 2 })} title="Heading 2">
			<IconH2 size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleHeading({ level: 3 })} title="Heading 3">
			<IconH3 size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleBlockquote()} title="Blockquote">
			<IconQuote size={18} />
		</Button>
		<div class="w-px h-6 bg-border mx-1"></div>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleList({ kind: 'bullet' })} title="Bullet List">
			<IconList size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleList({ kind: 'ordered' })} title="Ordered List">
			<IconListNumbers size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.toggleList({ kind: 'task' })} title="Task List">
			<IconListCheck size={18} />
		</Button>
		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.insertHorizontalRule()} title="Horizontal Rule">
			<IconMinus size={18} />
		</Button>
		<div class="w-px h-6 bg-border mx-1"></div>
		<Button variant="ghost" size="sm" type="button" onclick={() => fileInput.click()} title="Insert Image">
			<IconPhoto size={18} />
		</Button>
		<input type="file" accept="image/*" bind:this={fileInput} onchange={handleImageUpload} class="hidden" />

		<Button variant="ghost" size="sm" type="button" onclick={() => editor.commands.insertTable({ row: 3, col: 3 })} title="Insert Table">
			<IconTable size={18} />
		</Button>
	</div>
	
	<ProseKit {editor}>
		<div class="relative w-full flex-1 box-border overflow-y-auto min-h-[350px]">
			<div 
				use:editor.mount 
				class="prose prose-slate dark:prose-invert max-w-none p-4 min-h-full focus:outline-none"
				data-placeholder={placeholder}
			></div>

			<BlockHandleRoot>
				<BlockHandlePositioner placement="left" class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
					<BlockHandlePopup class="flex box-border origin-left transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95">
						<BlockHandleAdd class="h-6 w-6 cursor-pointer flex items-center box-border justify-center hover:bg-muted rounded-sm text-muted-foreground/50 hover:text-foreground">
							<IconPlus size={16} />
						</BlockHandleAdd>
						<BlockHandleDraggable class="h-6 w-5 cursor-grab flex items-center box-border justify-center hover:bg-muted rounded-sm text-muted-foreground/50 hover:text-foreground">
							<IconGripVertical size={16} />
						</BlockHandleDraggable>
					</BlockHandlePopup>
				</BlockHandlePositioner>
			</BlockHandleRoot>
			
			<DropIndicator class="z-50 transition-all bg-primary h-[2px]" />
			<TableHandle />
		</div>
	</ProseKit>
</div>

<style>
	/* Ensure the editor container takes space and handles typography well */
	:global(.ProseMirror) {
		outline: none;
		min-height: 350px;
	}
</style>
