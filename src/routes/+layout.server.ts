import { db } from '$lib/server/db';
import { setting } from '$lib/server/db/schema';

export const load = async ({ locals }) => {
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
