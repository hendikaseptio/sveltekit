import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { db } from '$lib/server/db';
import { analytics } from '$lib/server/db/schema';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const handleAnalytics: Handle = async ({ event, resolve }) => {
	const url = event.url.pathname;
	
	// Skip analytics for static files, api routes, and admin panel
	const isStatic = url.includes('.') && !url.endsWith('.html');
	const isAdmin = url.startsWith('/admin');
	const isAuth = url.startsWith('/auth');
	const isApi = url.startsWith('/api');

	if (!isStatic && !isAdmin && !isAuth && !isApi && !building) {
		// Log the visit asynchronously so it doesn't block the response
		const ip = event.getClientAddress();
		const userAgent = event.request.headers.get('user-agent');
		
		// Run in background
		db.insert(analytics).values({
			url,
			ip,
			userAgent
		}).catch(err => console.error('Analytics logging failed:', err));
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleBetterAuth, handleAnalytics);
