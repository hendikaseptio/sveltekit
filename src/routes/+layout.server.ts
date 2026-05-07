import { db } from '$lib/server/db';
import { setting } from '$lib/server/db/schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const settings = await db.select().from(setting).limit(1);
	
	return {
		settings: settings[0] || {
			siteName: 'My SvelteKit Blog',
			siteLogo: null,
			theme: 'auto'
		},
		user: locals.user
	};
};
