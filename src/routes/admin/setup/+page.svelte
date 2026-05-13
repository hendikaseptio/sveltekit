<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Card from "$lib/components/ui/card";
	import { 
		Wand2, 
		CheckCircle2, 
		Layout, 
		Settings, 
		Globe,
		ArrowRight,
		ArrowLeft,
		PlusCircle
	} from "lucide-svelte";
	import { fade, fly, slide } from 'svelte/transition';

	let step = $state(1);
	let totalSteps = 3;

	let siteName = $state("");
	let siteDescription = $state("");
	
	let selectedPages = $state([
		'tentang-kami',
		'kontak',
		'karya'
	]);

	const availablePages = [
		{ id: 'tentang-kami', label: 'Tentang Kami', icon: Layout, desc: 'Halaman untuk menceritakan sejarah dan visi misi Anda.' },
		{ id: 'kontak', label: 'Kontak', icon: PlusCircle, desc: 'Dilengkapi form kontak dan peta lokasi.' },
		{ id: 'harga', label: 'Harga / Layanan', icon: Settings, desc: 'Daftar paket harga atau layanan yang ditawarkan.' },
		{ id: 'profil-proyek', label: 'Profil Proyek', icon: Globe, desc: 'Halaman khusus untuk mendetailkan proyek Anda.' },
		{ id: 'karya', label: 'Karya / Portofolio', icon: Layout, desc: 'Galeri karya terbaik untuk memikat klien.' }
	];

	function togglePage(id: string) {
		if (selectedPages.includes(id)) {
			selectedPages = selectedPages.filter(p => p !== id);
		} else {
			selectedPages = [...selectedPages, id];
		}
	}

	function nextStep() {
		if (step < totalSteps) step++;
	}

	function prevStep() {
		if (step > 1) step--;
	}
</script>

<div class="min-h-screen bg-muted/30 flex items-center justify-center p-4">
	<div class="max-w-3xl w-full">
		<div class="text-center mb-8">
			<div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-4 shadow-xl shadow-primary/20">
				<Wand2 size={32} />
			</div>
			<h1 class="text-3xl font-black tracking-tight">Setup Wizard</h1>
			<p class="text-muted-foreground mt-2">Mari persiapkan website Anda dalam hitungan menit.</p>
		</div>

		<form method="POST" class="relative">
			{#if step === 1}
				<div transition:fly={{ x: -20, duration: 300 }}>
					<Card.Root class="border-2 shadow-2xl overflow-hidden">
						<Card.Header class="bg-muted/50 border-b">
							<Card.Title class="flex items-center gap-2">
								<Settings class="text-primary" size={20} />
								Profil Website
							</Card.Title>
							<Card.Description>Informasi dasar tentang website Anda.</Card.Description>
						</Card.Header>
						<Card.Content class="p-8 space-y-6">
							<div class="space-y-2">
								<Label for="siteName">Nama Website</Label>
								<Input 
									id="siteName" 
									name="siteName" 
									bind:value={siteName} 
									placeholder="Contoh: Studio Kreatif Kami" 
									class="text-lg"
								/>
							</div>
							<div class="space-y-2">
								<Label for="siteDescription">Deskripsi / Alamat Singkat</Label>
								<Textarea 
									id="siteDescription" 
									name="siteDescription" 
									bind:value={siteDescription} 
									placeholder="Gambarkan sedikit tentang bisnis Anda..." 
									rows={4}
								/>
							</div>
						</Card.Content>
						<Card.Footer class="bg-muted/50 border-t p-4 flex justify-end">
							<Button onclick={nextStep} class="gap-2 px-8">
								Lanjut
								<ArrowRight size={18} />
							</Button>
						</Card.Footer>
					</Card.Root>
				</div>
			{:else if step === 2}
				<div transition:fly={{ x: 20, duration: 300 }}>
					<Card.Root class="border-2 shadow-2xl overflow-hidden">
						<Card.Header class="bg-muted/50 border-b">
							<Card.Title class="flex items-center gap-2">
								<Layout class="text-primary" size={20} />
								Struktur Halaman
							</Card.Title>
							<Card.Description>Pilih halaman yang ingin otomatis dibuatkan.</Card.Description>
						</Card.Header>
						<Card.Content class="p-8">
							<div class="grid gap-4">
								{#each availablePages as page}
									<button 
										type="button"
										onclick={() => togglePage(page.id)}
										class="flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all {selectedPages.includes(page.id) ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-border hover:border-muted-foreground/30'}"
									>
										<div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg {selectedPages.includes(page.id) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}">
											<page.icon size={20} />
										</div>
										<div class="flex-1">
											<div class="flex items-center justify-between">
												<span class="font-bold">{page.label}</span>
												{#if selectedPages.includes(page.id)}
													<CheckCircle2 size={18} class="text-primary" />
												{/if}
											</div>
											<p class="text-xs text-muted-foreground mt-1 leading-relaxed">{page.desc}</p>
										</div>
										<input type="checkbox" name="pages" value={page.id} checked={selectedPages.includes(page.id)} class="hidden" />
									</button>
								{/each}
							</div>
						</Card.Content>
						<Card.Footer class="bg-muted/50 border-t p-4 flex justify-between">
							<Button variant="ghost" onclick={prevStep} class="gap-2">
								<ArrowLeft size={18} />
								Kembali
							</Button>
							<Button onclick={nextStep} class="gap-2 px-8">
								Review Akhir
								<ArrowRight size={18} />
							</Button>
						</Card.Footer>
					</Card.Root>
				</div>
			{:else}
				<div transition:fly={{ y: 20, duration: 300 }}>
					<Card.Root class="border-2 shadow-2xl overflow-hidden">
						<Card.Header class="bg-primary text-primary-foreground">
							<Card.Title class="flex items-center gap-2">
								<CheckCircle2 size={24} />
								Konfirmasi Setup
							</Card.Title>
							<Card.Description class="text-primary-foreground/80">Website Anda hampir siap diluncurkan.</Card.Description>
						</Card.Header>
						<Card.Content class="p-8 space-y-6">
							<div class="p-6 rounded-2xl bg-muted/50 border space-y-4">
								<div>
									<h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Nama Website</h4>
									<p class="text-xl font-bold">{siteName || 'Belum diisi'}</p>
								</div>
								<div>
									<h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Halaman yang akan dibuat</h4>
									<div class="flex flex-wrap gap-2 mt-2">
										<Badge variant="outline" class="bg-background">Beranda (Wajib)</Badge>
										{#each selectedPages as pageId}
											<Badge variant="default" class="bg-primary">
												{availablePages.find(p => p.id === pageId)?.label}
											</Badge>
										{/each}
										<Badge variant="outline" class="bg-background">Artikel (Otomatis)</Badge>
									</div>
								</div>
							</div>
							<p class="text-sm text-center text-muted-foreground italic">
								Klik tombol di bawah untuk memproses pembuatan database, halaman, dan menu Anda.
							</p>
						</Card.Content>
						<Card.Footer class="bg-muted/50 border-t p-4 flex justify-between">
							<Button variant="ghost" onclick={prevStep} class="gap-2">
								<ArrowLeft size={18} />
								Ganti Pilihan
							</Button>
							<Button type="submit" class="gap-2 px-8 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20">
								Selesaikan & Buka Admin
								<ArrowRight size={18} />
							</Button>
						</Card.Footer>
					</Card.Root>
				</div>
			{/if}
		</form>

		<!-- Step Indicator -->
		<div class="mt-8 flex items-center justify-center gap-3">
			{#each Array(totalSteps) as _, i}
				<div class="h-2 rounded-full transition-all duration-500 {step === i + 1 ? 'w-10 bg-primary' : 'w-2 bg-border'}"></div>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
