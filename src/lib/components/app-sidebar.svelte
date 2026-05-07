<script lang="ts">
	import {
		FileText,
		LayoutDashboard,
		File,
		HelpCircle,
		Box,
		List,
		Video,
		Settings
	} from 'lucide-svelte';
	// import NavDocuments from './nav-documents.svelte';
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import type { ComponentProps } from 'svelte';

	const settings = $derived(page.data.settings);

	const data = $derived({
		user: {
			name: page.data.user?.name || 'User',
			email: page.data.user?.email || '',
			avatar: page.data.user?.image || '/avatars/shadcn.jpg'
		},
		navMain: [
			{
				title: 'Dashboard',
				url: '/admin/dashboard',
				icon: LayoutDashboard
			},
			{
				title: 'Postingan',
				url: '/admin/postingan',
				icon: FileText
			},
			{
				title: 'Halaman',
				url: '/admin/halaman',
				icon: File
			},
			{
				title: 'Kategori',
				url: '/admin/kategori',
				icon: List
			},
			{
				title: 'Media',
				url: '/admin/media',
				icon: Video
			}
		],
		navSecondary: [
			{
				title: 'Pengaturan',
				url: '/admin/pengaturan',
				icon: Settings
			},
			{
				title: 'Panduan',
				url: '/admin/panduan',
				icon: HelpCircle
			}
		]
	});

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="/admin/dashboard" {...props}>
							{#if settings?.siteLogo}
								<img src={settings.siteLogo} alt="Logo" class="size-5 object-contain" />
							{:else}
								<Box class="!size-5" />
							{/if}
							<span class="text-base font-semibold">{settings?.siteName || 'Blog'}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<!-- <NavDocuments items={data.documents} /> -->
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
