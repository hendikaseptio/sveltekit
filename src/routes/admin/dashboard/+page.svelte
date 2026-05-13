<script lang="ts">
	import SectionCards from '$lib/components/section-cards.svelte';
	import ChartAreaInteractive from '$lib/components/chart-area-interactive.svelte';
	import DataTable from '$lib/components/custom/data-table.svelte';

	let { data } = $props();

	// Column definitions for TanStack Table
	const columns = [
		{
			accessorKey: 'header',
			header: 'Halaman / URL'
		},
		{
			accessorKey: 'type',
			header: 'Tipe'
		},
		{
			accessorKey: 'target',
			header: 'Total Kunjungan'
		}
	];
</script>

<div class="space-y-8 pb-10">
	<SectionCards stats={data.stats} />

	<div class="px-4 lg:px-6">
		<ChartAreaInteractive chartData={data.chartData} />
	</div>

	<div class="space-y-4">
		<div class="flex items-center justify-between px-4 lg:px-6">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Halaman Terpopuler</h2>
				<p class="text-sm text-muted-foreground">
					Daftar halaman dengan jumlah kunjungan terbanyak.
				</p>
			</div>
		</div>
		<DataTable data={data.topPages} {columns} searchPlaceholder="Cari halaman..." />
	</div>
</div>
