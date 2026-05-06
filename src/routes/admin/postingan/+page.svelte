<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import { Button } from '$lib/components/ui/button';
	import Plus from '@tabler/icons-svelte/icons/plus';

	let { data } = $props();
</script>

<div class="flex flex-col gap-6">
	<div class="flex items-center justify-between px-4 lg:px-6">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Postingan</h2>
			<p class="text-muted-foreground">Kelola semua artikel dan berita di sini.</p>
		</div>
		<Button href="/admin/postingan/tambah" class="gap-2">
			<Plus size={18} />
			Buat Postingan
		</Button>
	</div>

	<DataTable data={data.posts} />
</div>
