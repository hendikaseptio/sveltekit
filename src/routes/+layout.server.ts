import { db } from '$lib/server/db';
import { setting, menu } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const settings = await db.select().from(setting).limit(1);
	let menus = await db.select().from(menu).orderBy(asc(menu.order));
	
	// Auto-seed menus if empty
	if (menus.length === 0) {
		const defaultMenus = [
			{ label: 'Home', url: '/', order: 1, isExternal: false },
			{ label: 'Artikel', url: '/artikel', order: 2, isExternal: false },
			{ label: 'Kategori', url: '/kategori', order: 3, isExternal: false },
			{ label: 'Tentang Kami', url: '/about', order: 4, isExternal: false },
			{ label: 'Kontak', url: '/kontak', order: 5, isExternal: false }
		];

		try {
			for (const item of defaultMenus) {
				await db.insert(menu).values(item);
			}
			// Fetch again after seeding
			menus = await db.select().from(menu).orderBy(asc(menu.order));
		} catch (e) {
			console.error('Failed to auto-seed menus:', e);
		}
	}

	return {
		settings: settings[0] || {
			siteName: 'My SvelteKit Blog',
			siteLogo: null,
			theme: 'auto'
		},
		menus: menus,
		user: locals.user
	};
};
