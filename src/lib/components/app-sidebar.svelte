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
	import { localizeHref as resolve } from '$lib/paraglide/runtime';
	import type { ComponentProps, Component } from 'svelte';

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
				url: resolve('/admin/dashboard'),
				icon: LayoutDashboard as unknown as Component
			},
			{
				title: 'Postingan',
				url: resolve('/admin/postingan'),
				icon: FileText as unknown as Component
			},
			{
				title: 'Halaman',
				url: resolve('/admin/halaman'),
				icon: File as unknown as Component
			},
			{
				title: 'Kategori',
				url: resolve('/admin/kategori'),
				icon: List as unknown as Component
			},
			{
				title: 'Media',
				url: resolve('/admin/media'),
				icon: Video as unknown as Component
			}
		],
		navSecondary: [
			{
				title: 'Pengaturan',
				url: resolve('/admin/pengaturan'),
				icon: Settings as unknown as Component
			},
			{
				title: 'Panduan',
				url: resolve('/admin/panduan'),
				icon: HelpCircle as unknown as Component
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
						<a href={resolve("/admin/dashboard")} {...props}>
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
