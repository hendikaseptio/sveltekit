<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { 
		Target02Icon, 
		UserGroupIcon, 
		Mail01Icon,
		Linkedin01Icon,
		TwitterIcon
	} from "@hugeicons/core-free-icons";

	const team = [
		{
			name: "Hendi Kaseptio",
			role: "Founder & Lead Developer",
			bio: "Seorang pengembang web yang antusias dengan teknologi modern dan desain UI yang intuitif.",
			avatar: "H"
		},
		{
			name: "Alex Rivera",
			role: "Content Strategist",
			bio: "Pakar dalam menciptakan konten teknis yang mudah dipahami bagi pemula maupun profesional.",
			avatar: "A"
		},
		{
			name: "Sarah Chen",
			role: "UI/UX Designer",
			bio: "Fokus pada menciptakan pengalaman pengguna yang estetis dan fungsional di setiap proyek.",
			avatar: "S"
		}
	];
</script>

<div class="container mx-auto px-4 py-12 md:px-6">
	<!-- Hero Section -->
	<section class="mb-20 text-center">
		<Badge variant="outline" class="mb-4 border-primary/20 bg-primary/5 text-primary">Tentang Kami</Badge>
		<h1 class="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
			Membangun Masa Depan <span class="text-primary">Digital</span> Bersama
		</h1>
		<p class="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
			BlogModern adalah platform yang didedikasikan untuk berbagi wawasan terbaru seputar pengembangan web, 
			desain antarmuka, dan inovasi teknologi terkini.
		</p>
	</section>

	<!-- Mission Section -->
	<section class="mb-24 grid gap-12 lg:grid-cols-2 lg:items-center">
		<div class="relative aspect-video overflow-hidden rounded-3xl border border-border/40 shadow-xl">
			<div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
			<div class="flex h-full items-center justify-center bg-muted/30">
				<HugeiconsIcon icon={Target02Icon} size={80} class="text-primary/40" />
			</div>
		</div>
		<div class="space-y-6">
			<h2 class="text-3xl font-bold tracking-tight">Misi Kami</h2>
			<p class="text-lg leading-relaxed text-muted-foreground">
				Misi kami adalah mendemokratisasi pengetahuan teknologi dengan menyediakan konten berkualitas tinggi 
				yang dapat diakses oleh siapa saja. Kami percaya bahwa setiap pengembang memiliki potensi 
				untuk menciptakan perubahan positif melalui kode.
			</p>
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<div class="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
						<span class="text-xs font-bold">1</span>
					</div>
					<span>Memberikan tutorial yang mendalam dan praktis.</span>
				</li>
				<li class="flex items-start gap-3">
					<div class="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
						<span class="text-xs font-bold">2</span>
					</div>
					<span>Membangun komunitas pengembang yang inklusif.</span>
				</li>
				<li class="flex items-start gap-3">
					<div class="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
						<span class="text-xs font-bold">3</span>
					</div>
					<span>Menjelajahi teknologi terbaru dengan pendekatan kritis.</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- Team Section -->
	<section class="mb-24">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold tracking-tight">Tim Kami</h2>
			<p class="text-muted-foreground">Orang-orang di balik layar yang membuat BlogModern menjadi nyata.</p>
		</div>
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each team as member}
				<Card.Root class="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
					<Card.Header class="text-center">
						<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
							{member.avatar}
						</div>
						<Card.Title>{member.name}</Card.Title>
						<Card.Description>{member.role}</Card.Description>
					</Card.Header>
					<Card.Content class="text-center text-sm text-muted-foreground">
						{member.bio}
					</Card.Content>
					<Card.Footer class="flex justify-center gap-4">
						<Button variant="ghost" size="icon" class="h-8 w-8 rounded-full">
							<HugeiconsIcon icon={TwitterIcon} size={16} />
						</Button>
						<Button variant="ghost" size="icon" class="h-8 w-8 rounded-full">
							<HugeiconsIcon icon={Linkedin01Icon} size={16} />
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</section>

	<!-- Contact CTA -->
	<section class="rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-16">
		<HugeiconsIcon icon={Mail01Icon} size={48} class="mx-auto mb-6 opacity-80" />
		<h2 class="mb-4 text-3xl font-bold tracking-tight">Punya Pertanyaan?</h2>
		<p class="mx-auto mb-8 max-w-xl opacity-90">
			Kami selalu senang mendengar dari Anda. Baik itu saran, kritik, atau ajakan kerja sama.
		</p>
		<Button variant="secondary" size="lg" class="rounded-full px-8">
			Hubungi Kami
		</Button>
	</section>
</div>
