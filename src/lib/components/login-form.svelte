<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
	} from "$lib/components/ui/field/index.js";
	import { authClient } from "$lib/auth-client";
	import { toast } from "svelte-sonner";
	import { Loader2, Eye, EyeOff } from "lucide-svelte";
	import { goto } from "$app/navigation";

	const id = $props.id();
	
	let email = $state("");
	let password = $state("");
	let isLoading = $state(false);
	let showPassword = $state(false);

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		
		const { data, error } = await authClient.signIn.email({
			email,
			password,
			callbackURL: "/admin/dashboard"
		});

		if (error) {
			toast.error(error.message || "Login gagal. Cek kembali email dan password Anda.");
		} else {
			toast.success("Login berhasil! Mengalihkan...");
			goto("/admin/dashboard");
		}
		
		isLoading = false;
	}
</script>

<Card.Root class="mx-auto w-full max-w-sm border-2 shadow-xl">
	<Card.Header class="space-y-1">
		<Card.Title class="text-3xl font-black">Masuk Admin</Card.Title>
		<Card.Description>Masukkan email Anda untuk mengelola konten website.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleLogin}>
			<FieldGroup class="space-y-4">
				<Field>
					<FieldLabel for="email-{id}">Alamat Email</FieldLabel>
					<Input 
						id="email-{id}" 
						type="email" 
						placeholder="admin@example.com" 
						bind:value={email}
						required 
					/>
				</Field>
				<Field>
					<div class="flex items-center justify-between">
						<FieldLabel for="password-{id}">Kata Sandi</FieldLabel>
						<a href="/auth/forgot-password" class="text-xs font-medium text-primary hover:underline">
							Lupa kata sandi?
						</a>
					</div>
					<div class="relative">
						<Input 
							id="password-{id}" 
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
				</Field>
				<div class="pt-2">
					<Button type="submit" class="w-full h-11 font-bold" disabled={isLoading}>
						{#if isLoading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Sedang Masuk...
						{:else}
							Masuk Sekarang
						{/if}
					</Button>
				</div>
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t"></span>
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground">Atau lanjut dengan</span>
					</div>
				</div>
				<Button variant="outline" class="w-full h-11" type="button">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
						<path
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							fill="currentColor"
						/>
					</svg>
					Google
				</Button>
				<FieldDescription class="text-center text-xs pt-2">
					Lupa akses? <a href="/auth/forgot-password" class="font-bold text-primary hover:underline">Hubungi Super Admin</a>
				</FieldDescription>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
