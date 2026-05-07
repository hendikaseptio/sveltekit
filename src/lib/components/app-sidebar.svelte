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
	import type { ComponentProps } from 'svelte';

	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
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
		// navClouds: [
		// 	{
		// 		title: 'Capture',
		// 		icon: IconCamera,
		// 		isActive: true,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#'
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		title: 'Proposal',
		// 		icon: IconFileDescription,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#'
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		title: 'Prompts',
		// 		icon: IconFileAi,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#'
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#'
		// 			}
		// 		]
		// 	}
		// ],
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
	};

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<Box class="!size-5" />
							<span class="text-base font-semibold">Blog</span>
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
