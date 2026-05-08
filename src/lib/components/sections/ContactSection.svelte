<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Label } from "$lib/components/ui/label";
	import { Mail, Phone, MapPin, Send } from "lucide-svelte";

	let { 
		title = "Hubungi Kami",
		subtitle = "Punya pertanyaan? Kami siap membantu Anda.",
		email = "hello@example.com",
		phone = "+62 812-3456-7890",
		address = "Jl. Contoh No. 1, Jakarta"
	} = $props();

	let name = $state('');
	let contactEmail = $state('');
	let message = $state('');
</script>

<section class="py-20 lg:py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid gap-16 lg:grid-cols-2 lg:items-start">
			<!-- Info -->
			<div class="space-y-8">
				<div>
					<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-4">{title}</h2>
					<p class="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
				</div>
				<div class="space-y-5">
					<div class="flex items-center gap-4">
						<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
							<Mail class="text-primary" size={20} />
						</div>
						<div>
							<p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
							<a href="mailto:{email}" class="font-medium hover:text-primary transition-colors">{email}</a>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
							<Phone class="text-primary" size={20} />
						</div>
						<div>
							<p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Telepon</p>
							<a href="tel:{phone}" class="font-medium hover:text-primary transition-colors">{phone}</a>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
							<MapPin class="text-primary" size={20} />
						</div>
						<div>
							<p class="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Alamat</p>
							<p class="font-medium">{address}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Form -->
			<div class="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-5">
				<div class="space-y-2">
					<Label>Nama Lengkap</Label>
					<Input bind:value={name} placeholder="Nama kamu" />
				</div>
				<div class="space-y-2">
					<Label>Email</Label>
					<Input type="email" bind:value={contactEmail} placeholder="email@kamu.com" />
				</div>
				<div class="space-y-2">
					<Label>Pesan</Label>
					<Textarea bind:value={message} placeholder="Tulis pesan kamu di sini..." rows={5} />
				</div>
				<Button class="w-full rounded-xl gap-2">
					<Send size={16} />
					Kirim Pesan
				</Button>
			</div>
		</div>
	</div>
</section>
