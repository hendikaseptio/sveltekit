<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { 
		Wand2, 
		CheckCircle2, 
		Layout, 
		Settings, 
		Globe,
		ArrowRight,
		ArrowLeft,
		PlusCircle,
		Database,
		Loader2,
		AlertCircle,
		User
	} from "lucide-svelte";
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { toast } from "svelte-sonner";

	let { data, form } = $props();

	let step = $state(0);
	let totalSteps = 3; // Reduced since Admin creation is now seeded

	// Synchronize step with data.needsInit
	$effect(() => {
		if (data.needsInit) {
			step = 0;
		} else if (step === 0) {
			step = 1;
		}
	});

	let siteName = $state("");
	let siteDescription = $state("");
	let isInitializing = $state(false);
	
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
	<div class="w-full max-w-2xl">
		<div class="relative">
			{#if step === 0}
				<!-- Step 0: Database Initialization -->
				<div transition:fly={{ y: 20, duration: 300 }}>
					<Card.Root class="border-2 shadow-2xl overflow-hidden">
						<Card.Header class="bg-primary text-primary-foreground">
							<Card.Title class="flex items-center gap-2">
								<Database size={24} />
								Inisialisasi Database
							</Card.Title>
							<Card.Description class="text-primary-foreground/80">Kami perlu menyiapkan tabel database Anda terlebih dahulu.</Card.Description>
						</Card.Header>
						<Card.Content class="p-8 text-center space-y-6">
							<div class="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
								<Database size={40} />
							</div>
							<div class="space-y-2">
								<h3 class="text-xl font-bold">Siap Memulai?</h3>
								<p class="text-muted-foreground">Klik tombol di bawah untuk menjalankan migrasi database secara otomatis.</p>
							</div>
							
							{#if form?.success === false}
								<div class="p-4 bg-destructive/10 text-destructive rounded-xl text-sm flex items-start gap-3 text-left border border-destructive/20">
									<AlertCircle size={18} class="shrink-0 mt-0.5" />
									<p>{form.message}</p>
								</div>
							{/if}
						</Card.Content>
						<Card.Footer class="bg-muted/50 border-t p-4">
							<form method="POST" action="?/initDb" use:enhance={() => {
								isInitializing = true;
								return async ({ result, update }) => {
									await update();
									isInitializing = false;
									if (result.type === 'success' && result.data?.success) {
										toast.success("Database berhasil disiapkan!");
										window.location.reload(); // Force reload to clear cache
									}
								};
							}} class="w-full">
								<Button type="submit" class="w-full gap-2 h-12 text-lg font-bold" disabled={isInitializing}>
									{#if isInitializing}
										<Loader2 class="animate-spin" size={20} />
										Menyiapkan Database...
									{:else}
										<Wand2 size={20} />
										Siapkan Database Sekarang
									{/if}
								</Button>
							</form>
						</Card.Footer>
					</Card.Root>
				</div>
			{:else if step === 1}
				<!-- Step 1: Profil Web -->
				<div transition:fly={{ x: 20, duration: 300 }}>
					<Card.Root class="border-2 shadow-2xl overflow-hidden">
						<Card.Header class="bg-muted/50 border-b">
							<Card.Title class="flex items-center gap-2">
								<Globe class="text-primary" size={20} />
								Profil Website
							</Card.Title>
							<Card.Description>Berikan identitas untuk blog baru Anda.</Card.Description>
						</Card.Header>
						<Card.Content class="p-8 space-y-6">
							<div class="space-y-2">
								<Label for="siteName">Nama Website</Label>
								<Input id="siteName" placeholder="Contoh: Blog Teknologi Saya" bind:value={siteName} />
							</div>
							<div class="space-y-2">
								<Label for="siteDescription">Deskripsi / Alamat Singkat</Label>
								<Textarea id="siteDescription" placeholder="Jelaskan sedikit tentang website ini..." bind:value={siteDescription} />
							</div>
						</Card.Content>
						<Card.Footer class="bg-muted/50 border-t p-4 flex justify-end">
							<Button onclick={nextStep} disabled={!siteName} class="gap-2 px-8">
								Lanjut ke Halaman
								<ArrowRight size={18} />
							</Button>
						</Card.Footer>
					</Card.Root>
				</div>
			{:else if step === 2}
				<!-- Step 2: Struktur Halaman -->
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
										<div class="p-2 rounded-lg {selectedPages.includes(page.id) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}">
											<page.icon size={20} />
										</div>
										<div class="flex-1">
											<h4 class="font-bold">{page.label}</h4>
											<p class="text-xs text-muted-foreground mt-0.5">{page.desc}</p>
										</div>
										<div class="size-6 rounded-full border-2 flex items-center justify-center {selectedPages.includes(page.id) ? 'border-primary bg-primary' : 'border-border'}">
											{#if selectedPages.includes(page.id)}
												<CheckCircle2 size={14} class="text-primary-foreground" />
											{/if}
										</div>
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
								Konfirmasi Setup
								<ArrowRight size={18} />
							</Button>
						</Card.Footer>
					</Card.Root>
				</div>
			{:else if step === 3}
				<!-- Step 3: Final Confirmation -->
				<form method="POST" action="?/setup" use:enhance={() => {
					isInitializing = true;
					return async ({ update }) => {
						await update();
						isInitializing = false;
					};
				}}>
					<input type="hidden" name="siteName" value={siteName} />
					<input type="hidden" name="siteDescription" value={siteDescription} />
					{#each selectedPages as pageId}
						<input type="hidden" name="pages" value={pageId} />
					{/each}
					
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
									<div class="pt-4 border-t border-dashed">
										<h4 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 text-primary">🔐 Akun Default (Disediakan)</h4>
										<p class="text-xs text-muted-foreground mb-3">Untuk keamanan, akun dibuat melalui seeder. Gunakan kredensial berikut:</p>
										<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div class="p-3 bg-white rounded-lg border text-xs shadow-sm">
												<p class="font-bold flex items-center gap-1.5"><User size={14} class="text-primary" /> Super Admin</p>
												<p class="text-muted-foreground mt-2">Email: <span class="font-mono text-foreground select-all">admin@blog.com</span></p>
												<p class="text-muted-foreground">Pass: <span class="font-mono text-foreground select-all">password123</span></p>
											</div>
											<div class="p-3 bg-white rounded-lg border text-xs shadow-sm">
												<p class="font-bold flex items-center gap-1.5"><User size={14} class="text-blue-500" /> Editor</p>
												<p class="text-muted-foreground mt-2">Email: <span class="font-mono text-foreground select-all">editor@blog.com</span></p>
												<p class="text-muted-foreground">Pass: <span class="font-mono text-foreground select-all">password123</span></p>
											</div>
										</div>
									</div>
								</div>
								<div class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex gap-3 text-sm text-yellow-800">
									<AlertCircle class="shrink-0 mt-0.5" size={18} />
									<p><strong>Penting:</strong> Fitur pendaftaran publik telah dinonaktifkan demi keamanan. Silakan ganti password Anda setelah berhasil masuk ke dashboard.</p>
								</div>
							</Card.Content>
							<Card.Footer class="bg-muted/50 border-t p-4 flex justify-between">
								<Button variant="ghost" onclick={prevStep} class="gap-2">
									<ArrowLeft size={18} />
									Ganti Pilihan
								</Button>
								<Button type="submit" class="gap-2 px-8 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20" disabled={isInitializing}>
									{#if isInitializing}
										<Loader2 class="animate-spin" size={18} />
										Menyelesaikan...
									{:else}
										Selesaikan & Buka Admin
										<ArrowRight size={18} />
									{/if}
								</Button>
							</Card.Footer>
						</Card.Root>
					</div>
				</form>
			{/if}
		</div>

		<!-- Step Indicator -->
		<div class="mt-8 flex items-center justify-center gap-3">
			{#each Array(totalSteps + 1) as _, i}
				<div class="h-2 rounded-full transition-all duration-500 {step === i ? 'w-10 bg-primary' : 'w-2 bg-border'}"></div>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
