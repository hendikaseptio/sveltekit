<script lang="ts">
	import { Root as AccordionRoot, Item as AccordionItem, Trigger as AccordionTrigger, Content as AccordionContent } from "$lib/components/ui/accordion";

	interface FaqItem {
		question: string;
		answer: string;
	}

	let { 
		title = "Pertanyaan Umum",
		subtitle = "Temukan jawaban atas pertanyaan yang sering ditanyakan.",
		items = [
			{ question: "Bagaimana cara mendaftar?", answer: "Anda bisa mendaftar melalui halaman registrasi kami dengan mengisi formulir yang tersedia." },
			{ question: "Apakah layanan ini gratis?", answer: "Ya, layanan dasar kami tersedia secara gratis. Untuk fitur premium, tersedia paket berbayar." },
			{ question: "Bagaimana cara menghubungi tim dukungan?", answer: "Anda dapat menghubungi kami melalui email atau formulir kontak yang tersedia di halaman Kontak." }
		] as FaqItem[]
	} = $props();
</script>

<section class="py-20 lg:py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="mx-auto max-w-3xl">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl mb-4">{title}</h2>
				<p class="text-lg text-muted-foreground">{subtitle}</p>
			</div>

			<AccordionRoot type="single" class="space-y-3">
				{#each items as item, i}
					<AccordionItem value="faq-{i}" class="rounded-2xl border border-border/60 bg-card px-6 overflow-hidden">
						<AccordionTrigger class="py-5 text-left font-semibold text-base hover:no-underline hover:text-primary transition-colors">
							{item.question}
						</AccordionTrigger>
						<AccordionContent class="pb-5 text-muted-foreground leading-relaxed">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				{/each}
			</AccordionRoot>
		</div>
	</div>
</section>
