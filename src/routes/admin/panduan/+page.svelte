<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import {
		BookOpen,
		FileText,
		ImageIcon,
		Settings,
		Trash2,
		Zap,
		Clock,
		Globe,
		MousePointer2
	} from 'lucide-svelte';
</script>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 lg:px-6">
	<div class="space-y-2">
		<div
			class="flex items-center gap-2 text-sm font-semibold tracking-wider text-primary uppercase"
		>
			<BookOpen size={16} />
			Dokumentasi Pengguna
		</div>
		<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">Panduan Admin Dashboard</h1>
		<p class="text-xl text-muted-foreground">
			Pelajari cara mengelola konten, media, dan pengaturan situs Anda dengan efisien.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<Card.Root class="border-primary/20 bg-primary/5">
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

		<Card.Root class="border-blue-500/20 bg-blue-500/5">
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

		<Card.Root class="border-orange-500/20 bg-orange-500/5">
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
					<div
						class="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
					>
						<FileText size={18} />
					</div>
					Mengelola Postingan
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2">
				<div class="grid gap-4 md:grid-cols-2">
					<div class="space-y-2 rounded-lg border p-4">
						<h4 class="flex items-center gap-2 font-bold">
							<Zap size={16} class="text-yellow-500" />
							Editor Canggih
						</h4>
						<p class="text-sm text-balance text-muted-foreground">
							Gunakan editor WYSIWYG untuk memformat teks, menambahkan link, dan menyusun konten
							dengan mudah.
						</p>
					</div>
					<div class="space-y-2 rounded-lg border p-4">
						<h4 class="flex items-center gap-2 font-bold">
							<Clock size={16} class="text-blue-500" />
							Penjadwalan
						</h4>
						<p class="text-sm text-balance text-muted-foreground">
							Anda dapat mengatur status ke <strong>Draft</strong> untuk menyimpan progres, atau
							<strong>Published</strong> untuk publikasi instan maupun terjadwal.
						</p>
					</div>
				</div>
				<div class="rounded-xl border-2 border-dashed bg-muted/50 p-6">
					<h4 class="mb-2 flex items-center gap-2 font-bold">
						<ImageIcon size={18} class="text-primary" />
						Fitur Unggulan: Cover Image Dropzone
					</h4>
					<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
						<li>
							<strong>Drag & Drop:</strong> Tarik gambar langsung dari folder komputer Anda ke area upload.
						</li>
						<li>
							<strong>Paste Image:</strong> Tekan <strong>Ctrl+V</strong> untuk menempelkan gambar dari
							clipboard (hasil screenshot atau copy dari web).
						</li>
						<li>
							<strong>Auto Compression:</strong> Sistem otomatis mengompres gambar di bawah 500kb untuk
							performa loading cepat.
						</li>
						<li>
							<strong>Quick Copy:</strong> Salin URL gambar yang sudah diupload dengan tombol sekali klik.
						</li>
					</ul>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="media">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500"
					>
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
							<p class="text-sm">
								Sistem akan otomatis mendeteksi apakah suatu gambar sedang digunakan di artikel atau
								halaman mana pun.
							</p>
						</div>
					</div>
					<div class="flex gap-3">
						<Trash2 class="shrink-0 text-destructive" size={20} />
						<div>
							<p class="font-bold text-foreground">Pembersihan Sampah</p>
							<p class="text-sm">
								Gunakan filter <strong>"Sampah"</strong> untuk menemukan file yang tidak digunakan lagi
								dan hapus secara masal untuk menghemat ruang penyimpanan.
							</p>
						</div>
					</div>
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="settings">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"
					>
						<Settings size={18} />
					</div>
					Pengaturan Situs
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2 text-muted-foreground">
				<p>
					Halaman pengaturan memungkinkan Anda mengontrol identitas visual situs tanpa menyentuh
					kode.
				</p>
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
						<strong>Sosial Media:</strong> Integrasi link Facebook, Instagram, dan X yang akan muncul
						di footer.
					</li>
				</ul>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="internationalization">
			<Accordion.Trigger class="text-lg font-semibold">
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500"
					>
						<Globe size={18} />
					</div>
					Multi-Bahasa (Paraglide)
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4 pt-2 text-sm text-muted-foreground">
				<p>
					Situs Anda mendukung sistem i18n menggunakan Paraglide. Semua navigasi di dashboard dan
					publik secara otomatis menyesuaikan bahasa aktif.
				</p>
				<div class="flex items-start gap-3 rounded-lg bg-muted p-4">
					<Zap class="shrink-0 text-yellow-500" size={18} />
					<p>
						Untuk memastikan navigasi yang aman di dashboard, selalu gunakan fungsi <code
							>resolve(path)</code
						> saat memanggil link di dalam kode.
					</p>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<div
		class="group relative mt-8 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground"
	>
		<div class="relative z-10 space-y-4">
			<h3 class="text-2xl font-bold">Butuh Bantuan Lebih Lanjut?</h3>
			<p class="max-w-2xl opacity-90">
				Jika Anda menemui kendala teknis atau ingin menambahkan fitur baru, jangan ragu untuk
				menghubungi tim pengembang melalui menu dukungan.
			</p>
			<Button variant="secondary" class="font-bold">Hubungi Support</Button>
		</div>
		<BookOpen
			class="absolute -right-10 -bottom-10 size-64 opacity-10 transition-transform duration-700 group-hover:scale-110"
		/>
	</div>
</div>
