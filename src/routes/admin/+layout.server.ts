import { db } from '$lib/server/db';
import { setting } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	// Skip check for the setup page itself to avoid infinite redirect
	if (url.pathname === '/admin/setup') {
		return {};
	}

	const settings = await db.select().from(setting).limit(1);
	
	// If no settings exist or it's still default, redirect to setup wizard
	if (settings.length === 0 || settings[0].siteName === 'My SvelteKit Blog') {
		throw redirect(303, '/admin/setup');
	}

	return {
		settings: settings[0]
	};
};
