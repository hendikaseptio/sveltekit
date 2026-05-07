<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea";
	import { enhance } from "$app/forms";
	import { toast } from "svelte-sonner";
	import { Globe, Palette, MapPin, Phone, Link, X } from "lucide-svelte";

	let { data } = $props();
	
	let selectedTheme = $state(data.settings.theme);
	let logoPath = $state(data.settings.siteLogo || "");

	// Update state when data changes
	$effect(() => {
		selectedTheme = data.settings.theme;
		logoPath = data.settings.siteLogo || "";
	});
</script>

<div class="flex flex-col gap-6 max-w-4xl mx-auto w-full px-4 lg:px-6 py-6">
	<div>
		<h2 class="text-2xl font-bold tracking-tight">Pengaturan Situs</h2>
		<p class="text-muted-foreground">Konfigurasi identitas dan tampilan situs Anda.</p>
	</div>

	<form 
		method="POST" 
		action="?/update" 
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					toast.success("Pengaturan berhasil disimpan");
				}
				update();
			};
		}}
		class="space-y-6"
	>
		<!-- Identitas Situs -->
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2 text-lg">
					<Globe size={20} class="text-primary" />
					Identitas Situs
				</Card.Title>
				<Card.Description>Nama dan logo utama website Anda.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label for="siteName">Nama Situs</Label>
					<Input id="siteName" name="siteName" value={data.settings.siteName} required />
				</div>
				<div class="space-y-2">
					<Label for="siteLogo">URL Logo (atau Path Media)</Label>
					<div class="flex gap-2">
						<Input id="siteLogo" name="siteLogo" bind:value={logoPath} placeholder="/uploads/logo.png" />
						{#if logoPath}
							<div class="h-10 w-10 rounded border overflow-hidden bg-muted flex-shrink-0">
								<img src={logoPath} alt="Logo Preview" class="w-full h-full object-contain" />
							</div>
						{/if}
					</div>
					<p class="text-[10px] text-muted-foreground">Masukkan path dari Media Library (contoh: /uploads/image.png)</p>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Tampilan & Tema -->
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2 text-lg">
					<Palette size={20} class="text-primary" />
					Tampilan & Tema
				</Card.Title>
				<Card.Description>Atur preferensi warna antarmuka.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-2">
					<Label>Mode Tema</Label>
					<Select.Root type="single" name="theme" bind:value={selectedTheme}>
						<Select.Trigger class="w-full md:w-[200px]">
							{selectedTheme === 'light' ? 'Terang' : selectedTheme === 'dark' ? 'Gelap' : 'Otomatis (Sistem)'}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="light">Terang</Select.Item>
							<Select.Item value="dark">Gelap</Select.Item>
							<Select.Item value="auto">Otomatis (Sistem)</Select.Item>
						</Select.Content>
					</Select.Root>
					<input type="hidden" name="theme" value={selectedTheme} />
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Kontak & Alamat -->
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2 text-lg">
					<MapPin size={20} class="text-primary" />
					Kontak & Alamat
				</Card.Title>
				<Card.Description>Informasi kontak bisnis atau brand Anda.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label for="address">Alamat Lengkap</Label>
					<Textarea id="address" name="address" value={data.settings.address} placeholder="Jl. Raya Utama No. 1..." />
				</div>
				<div class="space-y-2">
					<Label for="phone">Nomor Telepon</Label>
					<div class="relative">
						<Phone size={16} class="absolute left-3 top-3 text-muted-foreground" />
						<Input id="phone" name="phone" value={data.settings.phone} class="pl-10" placeholder="+62 812..." />
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Media Sosial -->
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2 text-lg">
					<Link size={20} class="text-primary" />
					Media Sosial
				</Card.Title>
				<Card.Description>Tautan ke profil sosial media Anda.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4">
				<div class="space-y-2">
					<Label for="facebook">Facebook URL</Label>
					<div class="relative">
						<Link size={16} class="absolute left-3 top-3 text-muted-foreground" />
						<Input id="facebook" name="facebook" value={data.settings.facebook} class="pl-10" placeholder="https://facebook.com/brand" />
					</div>
				</div>
				<div class="space-y-2">
					<Label for="instagram">Instagram URL</Label>
					<div class="relative">
						<Link size={16} class="absolute left-3 top-3 text-muted-foreground" />
						<Input id="instagram" name="instagram" value={data.settings.instagram} class="pl-10" placeholder="https://instagram.com/brand" />
					</div>
				</div>
				<div class="space-y-2">
					<Label for="x">X (Twitter) URL</Label>
					<div class="relative">
						<X size={16} class="absolute left-3 top-3 text-muted-foreground" />
						<Input id="x" name="x" value={data.settings.x} class="pl-10" placeholder="https://x.com/brand" />
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<div class="flex justify-end pt-4">
			<Button type="submit" size="lg" class="px-8">Simpan Semua Pengaturan</Button>
		</div>
	</form>
</div>
