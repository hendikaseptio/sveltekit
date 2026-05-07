<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Accordion from "$lib/components/ui/accordion";
	import { 
		BookOpen, 
		FileText, 
		ImageIcon, 
		Settings, 
		Trash2, 
		Zap,
		Clock,
		Globe,
		MousePointer2,
		Copy
	} from "lucide-svelte";
</script>

<div class="flex flex-col gap-6 max-w-5xl mx-auto w-full px-4 lg:px-6 py-8">
	<div class="space-y-2">
		<div class="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm">
			<BookOpen size={16} />
			Dokumentasi Pengguna
		</div>
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">Panduan Admin Dashboard</h1>
		<p class="text-xl text-muted-foreground">
			Pelajari cara mengelola konten, media, dan pengaturan situs Anda dengan efisien.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<Card.Root class="bg-primary/5 border-primary/20">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<FileText class="text-primary" />
					Konten
				</Card.Title>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				Kelola artikel, halaman, dan kategori dengan editor yang intuitif.
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-blue-500/5 border-blue-500/20">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<ImageIcon class="text-blue-500" />
					Media
				</Card.Title>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				Manajemen aset visual dengan fitur deteksi sampah otomatis.
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-orange-500/5 border-orange-500/20">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Settings class="text-orange-500" />
					Situs
				</Card.Title>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				Konfigurasi identitas, tema, dan sosial media situs Anda.
			</Card.Content>
		</Card.Root>
	</div>

	<Accordion.Root type="single" collapsible class="w-full">
		<Accordion.Item value="postingan">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
						<FileText size={18} />
					</div>
					Mengelola Postingan
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2">
				<div class="grid gap-4 md:grid-cols-2">
					<div class="space-y-2 border p-4 rounded-lg">
						<h4 class="font-bold flex items-center gap-2">
							<Zap size={16} class="text-yellow-500" />
							Editor Canggih
						</h4>
						<p class="text-sm text-muted-foreground text-balance">
							Gunakan editor WYSIWYG untuk memformat teks, menambahkan link, dan menyusun konten dengan mudah.
						</p>
					</div>
					<div class="space-y-2 border p-4 rounded-lg">
						<h4 class="font-bold flex items-center gap-2">
							<Clock size={16} class="text-blue-500" />
							Penjadwalan
						</h4>
						<p class="text-sm text-muted-foreground text-balance">
							Anda dapat mengatur status ke <strong>Draft</strong> untuk menyimpan progres, atau <strong>Published</strong> untuk publikasi instan maupun terjadwal.
						</p>
					</div>
				</div>
				<div class="bg-muted/50 p-6 rounded-xl border-2 border-dashed">
					<h4 class="font-bold mb-2 flex items-center gap-2">
						<ImageIcon size={18} class="text-primary" />
						Fitur Unggulan: Cover Image Dropzone
					</h4>
					<ul class="list-disc list-inside space-y-2 text-sm text-muted-foreground">
						<li><strong>Drag & Drop:</strong> Tarik gambar langsung dari folder komputer Anda ke area upload.</li>
						<li><strong>Paste Image:</strong> Tekan <strong>Ctrl+V</strong> untuk menempelkan gambar dari clipboard (hasil screenshot atau copy dari web).</li>
						<li><strong>Auto Compression:</strong> Sistem otomatis mengompres gambar di bawah 500kb untuk performa loading cepat.</li>
						<li><strong>Quick Copy:</strong> Salin URL gambar yang sudah diupload dengan tombol sekali klik.</li>
					</ul>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="media">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div class="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
						<ImageIcon size={18} />
					</div>
					Perpustakaan Media
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2 text-muted-foreground">
				<p>Halaman media mencatat semua aset yang pernah diupload. Fitur utamanya meliputi:</p>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="flex gap-3">
						<MousePointer2 class="shrink-0 text-primary" size={20} />
						<div>
							<p class="font-bold text-foreground">Usage Tracking</p>
							<p class="text-sm">Sistem akan otomatis mendeteksi apakah suatu gambar sedang digunakan di artikel atau halaman mana pun.</p>
						</div>
					</div>
					<div class="flex gap-3">
						<Trash2 class="shrink-0 text-destructive" size={20} />
						<div>
							<p class="font-bold text-foreground">Pembersihan Sampah</p>
							<p class="text-sm">Gunakan filter <strong>"Sampah"</strong> untuk menemukan file yang tidak digunakan lagi dan hapus secara masal untuk menghemat ruang penyimpanan.</p>
						</div>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="settings">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div class="size-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
						<Settings size={18} />
					</div>
					Pengaturan Situs
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2 text-muted-foreground">
				<p>Halaman pengaturan memungkinkan Anda mengontrol identitas visual situs tanpa menyentuh kode.</p>
				<ul class="grid gap-3 text-sm">
					<li class="flex items-center gap-2">
						<Check class="text-green-500" size={16} />
						<strong>Identitas:</strong> Nama situs, logo, dan alamat fisik/brand.
					</li>
					<li class="flex items-center gap-2">
						<Check class="text-green-500" size={16} />
						<strong>Tema:</strong> Pilih skema warna (Terang, Gelap, atau Auto).
					</li>
					<li class="flex items-center gap-2">
						<Check class="text-green-500" size={16} />
						<strong>Sosial Media:</strong> Integrasi link Facebook, Instagram, dan X yang akan muncul di footer.
					</li>
				</ul>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="internationalization">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div class="size-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
						<Globe size={18} />
					</div>
					Multi-Bahasa (Paraglide)
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2 text-muted-foreground text-sm">
				<p>Situs Anda mendukung sistem i18n menggunakan Paraglide. Semua navigasi di dashboard dan publik secara otomatis menyesuaikan bahasa aktif.</p>
				<div class="bg-muted p-4 rounded-lg flex items-start gap-3">
					<Zap class="text-yellow-500 shrink-0" size={18} />
					<p>Untuk memastikan navigasi yang aman di dashboard, selalu gunakan fungsi <code>resolve(path)</code> saat memanggil link di dalam kode.</p>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<div class="mt-8 p-8 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden group">
		<div class="relative z-10 space-y-4">
			<h3 class="text-2xl font-bold">Butuh Bantuan Lebih Lanjut?</h3>
			<p class="opacity-90 max-w-2xl">
				Jika Anda menemui kendala teknis atau ingin menambahkan fitur baru, jangan ragu untuk menghubungi tim pengembang melalui menu dukungan.
			</p>
			<Button variant="secondary" class="font-bold">Hubungi Support</Button>
		</div>
		<BookOpen class="absolute -bottom-10 -right-10 size-64 opacity-10 group-hover:scale-110 transition-transform duration-700" />
	</div>
</div>
