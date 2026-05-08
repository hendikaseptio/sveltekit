import { db } from '$lib/server/db';
import { page } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await db.select().from(page).where(eq(page.slug, params.slug)).limit(1);
	
	if (res.length === 0) {
		throw error(404, 'Halaman tidak ditemukan');
	}

	return {
		page: res[0]
	};
};
