<script lang="ts">
	import { TrendingDown, TrendingUp, Users, FileText, Layout, Eye } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let { stats } = $props<{
		stats: {
			totalVisitors: number;
			todayVisitors: number;
			totalPosts: number;
			totalPages: number;
		}
	}>();
</script>

<div
	class="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card"
>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description class="flex items-center gap-2">
				<Users size={16} />
				Total Pengunjung
			</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{stats.totalVisitors.toLocaleString()}
			</Card.Title>
			<Card.Action>
				<Badge variant="outline" class="text-green-600 border-green-200 bg-green-50">
					<TrendingUp class="size-3 mr-1" />
					Live
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">
				Semua kunjungan tercatat <Eye class="size-4" />
			</div>
			<div class="text-muted-foreground">Akumulasi sejak website dipasang</div>
		</Card.Footer>
	</Card.Root>

	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description class="flex items-center gap-2">
				<TrendingUp size={16} />
				Kunjungan Hari Ini
			</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{stats.todayVisitors.toLocaleString()}
			</Card.Title>
			<Card.Action>
				<Badge variant="outline">
					Terbaru
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium text-primary">
				Update real-time <TrendingUp class="size-4" />
			</div>
			<div class="text-muted-foreground">Kunjungan unik hari ini</div>
		</Card.Footer>
	</Card.Root>

	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description class="flex items-center gap-2">
				<FileText size={16} />
				Total Postingan
			</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{stats.totalPosts.toLocaleString()}
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">
				Artikel & Konten <FileText class="size-4" />
			</div>
			<div class="text-muted-foreground">Total artikel di database</div>
		</Card.Footer>
	</Card.Root>

	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description class="flex items-center gap-2">
				<Layout size={16} />
				Halaman Statis
			</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{stats.totalPages.toLocaleString()}
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">
				Struktur Web <Layout class="size-4" />
			</div>
			<div class="text-muted-foreground">Halaman landing yang aktif</div>
		</Card.Footer>
	</Card.Root>
</div>
