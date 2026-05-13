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
	import { goto } from "$app/navigation";

	const id = $props.id();
	
	let password = $state("");
	let confirmPassword = $state("");
	let isLoading = $state(false);

	async function handleResetPassword(e: SubmitEvent) {
		e.preventDefault();
		
		if (password !== confirmPassword) {
			toast.error("Password tidak cocok!");
			return;
		}

		isLoading = true;
		
		const { data, error } = await authClient.resetPassword({
			newPassword: password
		});

		if (error) {
			toast.error(error.message || "Gagal mengatur ulang kata sandi. Tautan mungkin kadaluarsa.");
		} else {
			toast.success("Password berhasil diatur ulang! Silakan login kembali.");
			goto("/auth/login");
		}
		
		isLoading = false;
	}
</script>

<Card.Root class="mx-auto w-full max-w-sm border-2 shadow-xl">
	<Card.Header>
		<Card.Title class="text-3xl font-black">Reset Password</Card.Title>
		<Card.Description>Masukkan kata sandi baru Anda di bawah ini.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleResetPassword}>
			<FieldGroup class="space-y-6">
				<Field>
					<FieldLabel for="password-{id}">Password Baru</FieldLabel>
					<Input id="password-{id}" type="password" bind:value={password} required />
					<FieldDescription>Gunakan minimal 8 karakter dengan kombinasi angka.</FieldDescription>
				</Field>
				<Field>
					<FieldLabel for="confirm-password-{id}">Konfirmasi Password Baru</FieldLabel>
					<Input id="confirm-password-{id}" type="password" bind:value={confirmPassword} required />
				</Field>
				<div class="space-y-3">
					<Button type="submit" class="w-full h-11 font-bold" disabled={isLoading}>
						{#if isLoading}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Sedang Memproses...
						{:else}
							Simpan Password Baru
						{/if}
					</Button>
				</div>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
