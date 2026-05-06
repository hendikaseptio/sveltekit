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

	const id = $props.id();
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Lupa Password</Card.Title>
		<Card.Description>Masukkan email Anda untuk menerima tautan pemulihan kata sandi.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<FieldGroup>
				<Field>
					<FieldLabel for="email-{id}">Email</FieldLabel>
					<Input id="email-{id}" type="email" placeholder="m@example.com" required />
				</Field>
				<Field>
					<Button type="submit" class="w-full text-white">Kirim Tautan Pemulihan</Button>
				</Field>
				<Field>
					<FieldDescription class="text-center">
						Kembali ke <a href="/auth/login" class="underline">Halaman Login</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
