<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { IconGripVertical } from "@tabler/icons-svelte";
	import type { Attachment } from "svelte/attachments";

	let { attach }: { attach?: Attachment } = $props();
</script>

<Button
	{@attach attach}
	variant="ghost"
	size="icon"
	class="text-muted-foreground size-7 hover:bg-transparent"
>
	<IconGripVertical class="text-muted-foreground size-3" />
	<span class="sr-only">Drag to reorder</span>
</Button>
