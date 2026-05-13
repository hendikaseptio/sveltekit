<script lang="ts">
	import SEO from "$lib/components/SEO.svelte";
</script>

<SEO 
	title="Hubungi Kami | BlogModern" 
	description="Silakan hubungi kami untuk pertanyaan, saran, atau kolaborasi. Kami siap membantu Anda."
/>

<div class="min-h-screen">
	<!-- Hero Secondary Section -->
	<section class="py-16 lg:py-20 bg-muted/40 border-y border-border/50">
		<div class="container mx-auto px-4 md:px-6">
			<div class="max-w-3xl mx-auto text-center">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-4">Hubungi Kami</h2>
				<p class="text-lg text-muted-foreground leading-relaxed mb-6">Punya pertanyaan? Kami di sini untuk membantu.</p>
				
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="py-20 lg:py-24">
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid gap-16 lg:grid-cols-2 lg:items-start">
				<div class="space-y-8">
					<div>
						<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-4">Informasi Kontak</h2>
						<p class="text-lg text-muted-foreground leading-relaxed">Kami siap membantu Anda melalui berbagai saluran komunikasi.</p>
					</div>
					<div class="space-y-5">
						<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">✉</div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p><a href="mailto:hello@example.com" class="font-medium hover:text-primary transition-colors">hello@example.com</a></div></div>
						<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">☎</div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Telepon</p><a href="tel:+62 812-3456-7890" class="font-medium hover:text-primary transition-colors">+62 812-3456-7890</a></div></div>
						<div class="flex items-center gap-4"><div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">📍</div><div><p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Alamat</p><p class="font-medium">Jl. Contoh No. 1, Jakarta</p></div></div>
					</div>
				</div>
				<div class="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-5">
					<div class="space-y-2"><label class="text-sm font-medium">Nama Lengkap</label><input type="text" placeholder="Nama kamu" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
					<div class="space-y-2"><label class="text-sm font-medium">Email</label><input type="email" placeholder="email@kamu.com" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
					<div class="space-y-2"><label class="text-sm font-medium">Pesan</label><textarea placeholder="Tulis pesan kamu..." rows="5" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"></textarea></div>
					<button type="button" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Kirim Pesan</button>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 lg:py-28 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
		<div class="container mx-auto px-4 md:px-6 text-center">
			<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl mb-5 max-w-3xl mx-auto">Siap Memulai?</h2>
			<p class="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">Bergabunglah dan rasakan manfaatnya sekarang.</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/" class="inline-flex items-center justify-center gap-2 rounded-full bg-background/20 px-8 py-3 text-base font-semibold hover:bg-background/30 transition-colors border border-white/20">Kembali ke Beranda →</a>
				
			</div>
		</div>
	</section>
</div>
