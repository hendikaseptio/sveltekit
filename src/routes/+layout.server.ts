import { db } from '$lib/server/db';
import { setting, menu } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const settings = await db.select().from(setting).limit(1);
	const menus = await db.select().from(menu).orderBy(asc(menu.order));
	
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
