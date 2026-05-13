<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: string;
		siteName?: string;
		author?: string;
	}

	let { 
		title = "My SvelteKit Site",
		description = "Temukan berbagai informasi menarik dan artikel bermanfaat di website kami.",
		image = "/images/og-default.png",
		url = "https://yourdomain.com",
		type = "website",
		siteName = "My Site",
		author = "Admin"
	}: Props = $props();

	// Ensure absolute URL for image
	let absoluteImage = $derived(image.startsWith('http') ? image : `${url}${image}`);
</script>

<svelte:head>
	<!-- Standard Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={absoluteImage} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />
</svelte:head>
