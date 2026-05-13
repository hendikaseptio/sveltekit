<script lang="ts">
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import { scaleUtc } from "d3-scale";
	import { Area, AreaChart } from "layerchart";
	import { curveNatural } from "d3-shape";

	let { chartData = [] } = $props<{
		chartData: Array<{ date: Date, desktop: number, mobile: number }>
	}>();

	let timeRange = $state("30d");

	const selectedLabel = $derived.by(() => {
		switch (timeRange) {
			case "90d":
				return "Last 3 months";
			case "30d":
				return "Last 30 days";
			case "7d":
				return "Last 7 days";
			default:
				return "Last 30 days";
		}
	});

	const filteredData = $derived(
		chartData.filter((item) => {
			const referenceDate = new Date();
			let daysToSubtract = 30;
			if (timeRange === "30d") {
				daysToSubtract = 30;
			} else if (timeRange === "7d") {
				daysToSubtract = 7;
			} else if (timeRange === "90d") {
				daysToSubtract = 90;
			}

			referenceDate.setDate(referenceDate.getDate() - daysToSubtract);
			return item.date >= referenceDate;
		})
	);

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--primary)" },
		mobile: { label: "Mobile", color: "var(--secondary)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="@container/card">
	<Card.Header>
		<Card.Title>Grafik Pengunjung</Card.Title>
		<Card.Description>
			Statistik kunjungan website berdasarkan perangkat.
		</Card.Description>
		<Card.Action>
			<ToggleGroup.Root
				type="single"
				bind:value={timeRange}
				variant="outline"
				class="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
			>
				<ToggleGroup.Item value="90d">3 Bulan</ToggleGroup.Item>
				<ToggleGroup.Item value="30d">30 Hari</ToggleGroup.Item>
				<ToggleGroup.Item value="7d">7 Hari</ToggleGroup.Item>
			</ToggleGroup.Root>
		</Card.Action>
	</Card.Header>
	<Card.Content class="px-2 pt-4 sm:px-6 sm:pt-6">
		{#if filteredData.length > 0}
			<Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
				<AreaChart
					legend
					data={filteredData}
					x="date"
					xScale={scaleUtc()}
					series={[
						{
							key: "mobile",
							label: "Mobile",
							color: "var(--color-mobile)",
						},
						{
							key: "desktop",
							label: "Desktop",
							color: "var(--color-desktop)",
						},
					]}
					seriesLayout="stack"
					props={{
						xAxis: {
							format: (v) => {
								return v.toLocaleDateString("id-ID", {
									month: "short",
									day: "numeric",
								});
							},
						},
						yAxis: { format: (v) => v.toString() },
					}}
				>
					{#snippet marks({ context })}
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stop-color="var(--color-desktop)"
									stop-opacity={0.8}
								/>
								<stop
									offset="95%"
									stop-color="var(--color-desktop)"
									stop-opacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stop-color="var(--color-mobile)" stop-opacity={0.5} />
								<stop
									offset="95%"
									stop-color="var(--color-mobile)"
									stop-opacity={0.1}
								/>
							</linearGradient>
						</defs>
						{#each context.series.visibleSeries as s (s.key)}
							<Area
								seriesKey={s.key}
								curve={curveNatural}
								fillOpacity={0.4}
								line={{ class: "stroke-2" }}
								motion="tween"
								{...s.props}
								fill={s.key === "desktop" ? "url(#fillDesktop)" : "url(#fillMobile)"}
							/>
						{/each}
					{/snippet}
					{#snippet tooltip()}
						<Chart.Tooltip
							labelFormatter={(v: Date) => {
								return v.toLocaleDateString("id-ID", {
									month: "long",
									day: "numeric",
									year: "numeric"
								});
							}}
							indicator="line"
						/>
					{/snippet}
				</AreaChart>
			</Chart.Container>
		{:else}
			<div class="h-[250px] flex items-center justify-center text-muted-foreground italic border-2 border-dashed rounded-xl">
				Belum ada data kunjungan untuk periode ini.
			</div>
		{/if}
	</Card.Content>
</Card.Root>
