import { db } from '$lib/server/db';
import { page } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateSvelteFile, generateServerFile, generateHtmlPreview } from '$lib/server/section-generator';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const type = url.searchParams.get('type') ?? 'svelte';

	const res = await db.select().from(page).where(eq(page.id, params.id)).limit(1);
	if (res.length === 0) throw error(404, 'Halaman tidak ditemukan');

	const pageData = res[0];
	const sections = pageData.sections ? JSON.parse(pageData.sections) : [];
	const slug = pageData.slug;

	if (type === 'svelte') {
		const code = generateSvelteFile(pageData, sections);
		return new Response(code, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Content-Disposition': `attachment; filename="+page.svelte"`
			}
		});
	}

	if (type === 'server') {
		const code = generateServerFile(sections);
		if (!code) {
			return new Response('// No server-side data fetching needed for this page.\n', {
				headers: {
					'Content-Type': 'text/plain; charset=utf-8',
					'Content-Disposition': `attachment; filename="+page.server.ts"`
				}
			});
		}
		return new Response(code, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Content-Disposition': `attachment; filename="+page.server.ts"`
			}
		});
	}

	if (type === 'html') {
		const html = generateHtmlPreview(pageData, sections);
		return new Response(html, {
			headers: {
				'Content-Type': 'text/html; charset=utf-8',
				'Content-Disposition': `attachment; filename="${slug}.html"`
			}
		});
	}

	if (type === 'preview') {
		// Returns HTML for inline iframe preview (no download)
		const html = generateHtmlPreview(pageData, sections);
		return new Response(html, {
			headers: { 'Content-Type': 'text/html; charset=utf-8' }
		});
	}

	throw error(400, 'type must be svelte | server | html | preview');
};
