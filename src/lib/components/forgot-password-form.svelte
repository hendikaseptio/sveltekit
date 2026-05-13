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
	import { Loader2 } from "lucide-svelte";

	const id = $props.id();
	
	let email = $state("");
	let isLoading = $state(false);
	let isSent = $state(false);

	async function handleForgotPassword(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		
		const { data, error } = await authClient.forgetPassword({
			email,
			redirectTo: "/auth/reset-password"
		});

		if (error) {
			toast.error(error.message || "Gagal mengirim permintaan. Pastikan email Anda benar.");
		} else {
			toast.success("Tautan pemulihan telah dikirim ke email Anda!");
			isSent = true;
		}
		
		isLoading = false;
	}
</script>

<Card.Root class="mx-auto w-full max-w-sm border-2 shadow-xl">
	<Card.Header>
		<Card.Title class="text-3xl font-black">Lupa Password</Card.Title>
		<Card.Description>Masukkan email Anda untuk menerima tautan pemulihan kata sandi.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if isSent}
			<div class="text-center space-y-4 py-4">
				<div class="bg-green-100 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-200">
					Tautan pemulihan telah dikirim! Silakan periksa kotak masuk email Anda.
				</div>
				<Button variant="outline" class="w-full h-11" onclick={() => isSent = false}>
					Kirim Ulang
				</Button>
				<p class="text-sm text-muted-foreground">
					Kembali ke <a href="/auth/login" class="font-bold text-primary hover:underline">Halaman Login</a>
				</p>
			</div>
		{:else}
			<form onsubmit={handleForgotPassword}>
				<FieldGroup class="space-y-6">
					<Field>
						<FieldLabel for="email-{id}">Alamat Email</FieldLabel>
						<Input id="email-{id}" type="email" placeholder="admin@example.com" bind:value={email} required />
						<FieldDescription>Kami akan mengirimkan instruksi ke email ini.</FieldDescription>
					</Field>
					<div class="space-y-3">
						<Button type="submit" class="w-full h-11 font-bold" disabled={isLoading}>
							{#if isLoading}
								<Loader2 class="mr-2 h-4 w-4 animate-spin" />
								Sedang Mengirim...
							{:else}
								Kirim Tautan Pemulihan
							{/if}
						</Button>
						<p class="text-center text-sm text-muted-foreground mt-4">
							Ingat password Anda? <a href="/auth/login" class="font-bold text-primary hover:underline">Login kembali</a>
						</p>
					</div>
				</FieldGroup>
			</form>
		{/if}
	</Card.Content>
</Card.Root>
