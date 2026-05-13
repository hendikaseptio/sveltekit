import { db } from '$lib/server/db';
import { setting, menu } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// 1. Skip check for admin setup and auth routes
	if (url.pathname.startsWith('/admin/setup') || url.pathname.startsWith('/auth')) {
		return { user: locals.user };
	}

	let settings;
	let menus = [];

	try {
		// 2. Try to fetch settings
		const settingsResult = await db.select().from(setting).limit(1);
		settings = settingsResult[0];
		
		// 3. If no settings exist or it's still default, redirect to setup wizard
		if ((!settings || settings.siteName === 'My SvelteKit Blog') && !url.pathname.startsWith('/admin')) {
			throw redirect(303, '/admin/setup');
		}

		// 4. Fetch menus
		menus = await db.select().from(menu).orderBy(asc(menu.order));
	} catch (e: any) {
		// If it's a redirect, re-throw it
		if (e.status === 303) throw e;

		// If tables are missing or other DB error, redirect to setup
		console.error('Global layout DB check failed:', e.message);
		throw redirect(303, '/admin/setup');
	}

	return {
		settings: settings || {
			siteName: 'My SvelteKit Blog',
			siteLogo: null,
			theme: 'auto'
		},
		menus: menus,
		user: locals.user
	};
};
