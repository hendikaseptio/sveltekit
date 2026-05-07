<script lang="ts"> 
	import type { ProseMirrorNode } from 'prosekit/pm/model'; 
	import { UploadTask } from 'prosekit/extensions/file';
	import type { ImageAttrs } from 'prosekit/extensions/image';
	import type { SvelteNodeViewProps } from 'prosekit/svelte';
	import { ResizableHandle, ResizableRoot } from 'prosekit/svelte/resizable';
	import { fromStore } from 'svelte/store';
	import { Loader2, ImageOff, ArrowDownRight } from 'lucide-svelte';
	
	interface Props extends SvelteNodeViewProps {} 
	const props: Props = $props();
	
	const node: ProseMirrorNode = $derived(fromStore(props.node).current);
	const selected: boolean = $derived(fromStore(props.selected).current);
	const attrs = $derived(node.attrs as ImageAttrs);
	const url = $derived(attrs.src || '');
	const uploading = $derived(url.startsWith('blob:'));
	
	let aspectRatio = $state<number | undefined>(undefined);
	let error = $state<string | undefined>(undefined);
	let progress = $state(0);
	
	$effect(() => { 
		if (!uploading) { return; } 
		const uploadTask = UploadTask.get<string>(url);
		if (!uploadTask) return;
		let canceled = false;
		uploadTask.finished.catch((err) => { 
			if (canceled) return;
			error = String(err);
		});
		const unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => { 
			if (canceled) return;
			progress = total ? loaded / total : 0;
		});
		return () => { 
			canceled = true;
			unsubscribeProgress();
		};
	});
	
	function handleImageLoad(event: Event) { 
		const img = event.target as HTMLImageElement;
		const { naturalWidth, naturalHeight } = img;
		const ratio = naturalWidth / naturalHeight;
		if (ratio && Number.isFinite(ratio)) { 
			aspectRatio = ratio;
		} 
		if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) { 
			props.setAttrs({ width: naturalWidth, height: naturalHeight });
		} 
	} 
</script> 

<ResizableRoot 
	width={attrs.width ?? undefined} 
	height={attrs.height ?? undefined} 
	{aspectRatio} 
	data-selected={selected ? '' : undefined} 
	class="relative flex items-center justify-center box-border overflow-hidden my-2 group max-h-150 max-w-full min-h-16 min-w-16 outline-2 outline-transparent data-selected:outline-primary outline-solid" 
	onResizeEnd={(event) => props.setAttrs(event.detail)} 
> 
	{#if url && !error} 
		<img 
			src={url} 
			alt="upload preview" 
			class="h-full w-full max-w-full max-h-full object-contain" 
			onload={handleImageLoad} 
		/> 
	{/if} 
	
	{#if uploading && !error} 
		<div class="absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded-sm bg-gray-800/60 p-1.5 text-xs text-white/80 transition"> 
			<Loader2 size={16} class="animate-spin" /> 
			<div>{Math.round(progress * 100)}%</div> 
		</div> 
	{/if} 
	
	{#if error} 
		<div class="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-muted p-2 text-sm @container"> 
			<ImageOff size={32} /> 
			<div class="hidden opacity-80 @xs:block"> Failed to upload image </div> 
		</div> 
	{/if} 
	
	<ResizableHandle 
		class="absolute bottom-0 right-0 rounded-sm m-1.5 p-1 transition bg-primary/30 active:bg-primary hover:bg-primary/80 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5 opacity-0 hover:opacity-100 group-hover:opacity-100 group-data-resizing:opacity-100 cursor-nwse-resize" 
		position="bottom-right" 
	> 
		<ArrowDownRight size={16} /> 
	</ResizableHandle> 
</ResizableRoot>
