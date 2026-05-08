import { db } from '$lib/server/db';
import { page, post } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq, desc, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await db.select().from(page).where(eq(page.slug, params.slug)).limit(1);
	
	if (res.length === 0) {
		throw error(404, 'Halaman tidak ditemukan');
	}

	const pageData = res[0];

	// Check if any section needs posts data
	let latestPosts: any[] = [];
	if (pageData.sections) {
		const sections = JSON.parse(pageData.sections);
		const needsPosts = sections.some((s: any) => s.type === 'posts');
		if (needsPosts) {
			latestPosts = await db
				.select()
				.from(post)
				.where(eq(post.status, 'published'))
				.orderBy(desc(post.publishedAt))
				.limit(6);
		}
	}

	return {
		page: pageData,
		latestPosts
	};
};
