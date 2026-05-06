<script lang="ts">
	import {
		IconCamera,
		IconChartBar,
		IconDashboard,
		IconDatabase,
		IconFileAi,
		IconFileDescription,
		IconFileWord,
		IconFolder,
		IconHelp,
		IconInnerShadowTop,
		IconListDetails,
		IconReport,
		IconSearch,
		IconSettings,
		IconUsers
	} from '@tabler/icons-svelte';
	import NavDocuments from './nav-documents.svelte';
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
				url: '#',
				icon: IconDashboard
			},
			{
				title: 'Lifecycle',
				url: '#',
				icon: IconListDetails
			},
			{
				title: 'Analytics',
				url: '#',
				icon: IconChartBar
			},
			{
				title: 'Projects',
				url: '#',
				icon: IconFolder
			},
			{
				title: 'Team',
				url: '#',
				icon: IconUsers
			}
		],
		navClouds: [
			{
				title: 'Capture',
				icon: IconCamera,
				isActive: true,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			},
			{
				title: 'Proposal',
				icon: IconFileDescription,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			},
			{
				title: 'Prompts',
				icon: IconFileAi,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#'
					},
					{
						title: 'Archived',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '#',
				icon: IconSettings
			},
			{
				title: 'Get Help',
				url: '#',
				icon: IconHelp
			},
			{
				title: 'Search',
				url: '#',
				icon: IconSearch
			}
		],
		documents: [
			{
				name: 'Data Library',
				url: '#',
				icon: IconDatabase
			},
			{
				name: 'Reports',
				url: '#',
				icon: IconReport
			},
			{
				name: 'Word Assistant',
				url: '#',
				icon: IconFileWord
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
							<IconInnerShadowTop class="!size-5" />
							<span class="text-base font-semibold">Acme Inc.</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavDocuments items={data.documents} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
