<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Field from "$lib/components/ui/field/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { authClient } from "$lib/auth-client";
	import { toast } from "svelte-sonner";
	import { Loader2, Eye, EyeOff } from "lucide-svelte";
	import { goto } from "$app/navigation";

	let name = $state("");
	let email = $state("");
	let password = $state("");
	let confirmPassword = $state("");
	let isLoading = $state(false);
	let showPassword = $state(false);

	async function handleSignUp(e: SubmitEvent) {
		e.preventDefault();
		
		if (password !== confirmPassword) {
			toast.error("Konfirmasi kata sandi tidak cocok!");
			return;
		}

		isLoading = true;
		
		const { data, error } = await authClient.signUp.email({
			email,
			password,
			name,
			callbackURL: "/admin/dashboard"
		});

		if (error) {
			toast.error(error.message || "Pendaftaran gagal. Silakan coba lagi.");
		} else {
			toast.success("Akun admin berhasil dibuat!");
			goto("/admin/dashboard");
		}
		
		isLoading = false;
	}
</script>

<Card.Root class="mx-auto w-full max-w-md border-2 shadow-xl">
	<Card.Header>
		<Card.Title class="text-3xl font-black">Daftar Akun Admin</Card.Title>
		<Card.Description>Lengkapi formulir di bawah untuk membuat akses administrator baru.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSignUp}>
			<Field.Group class="space-y-4">
				<Field.Field>
					<Field.Label for="name">Nama Lengkap</Field.Label>
					<Input id="name" type="text" placeholder="Masukkan nama Anda..." bind:value={name} required />
				</Field.Field>
				<Field.Field>
					<Field.Label for="email">Alamat Email</Field.Label>
					<Input id="email" type="email" placeholder="admin@example.com" bind:value={email} required />
					<Field.Description>
						Email ini akan digunakan untuk login ke panel admin.
					</Field.Description>
				</Field.Field>
				<Field.Field>
					<Field.Label for="password">Kata Sandi</Field.Label>
					<div class="relative">
						<Input 
							id="password" 
							type={showPassword ? "text" : "password"} 
							bind:value={password} 
							required 
						/>
						<button 
							type="button" 
							class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							onclick={() => showPassword = !showPassword}
						>
							{#if showPassword}
								<EyeOff size={18} />
							{:else}
								<Eye size={18} />
							{/if}
						</button>
					</div>
					<Field.Description>Minimal gunakan 8 karakter.</Field.Description>
				</Field.Field>
				<Field.Field>
					<Field.Label for="confirm-password">Konfirmasi Kata Sandi</Field.Label>
					<Input 
						id="confirm-password" 
						type={showPassword ? "text" : "password"} 
						bind:value={confirmPassword} 
						required 
					/>
				</Field.Field>
				<div class="pt-4 space-y-3">
					<Button type="submit" class="w-full h-11 font-bold" disabled={isLoading}>
						{#if isLoading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Sedang Memproses...
						{:else}
							Buat Akun Sekarang
						{/if}
					</Button>
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<span class="w-full border-t"></span>
						</div>
						<div class="relative flex justify-center text-xs uppercase">
							<span class="bg-background px-2 text-muted-foreground">Atau daftar lewat</span>
						</div>
					</div>
					<Button variant="outline" type="button" class="w-full h-11">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
						Google Account
					</Button>
					<p class="text-center text-sm text-muted-foreground mt-4">
						Sudah punya akses? <a href="/auth/login" class="font-bold text-primary hover:underline">Masuk di sini</a>
					</p>
				</div>
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>
