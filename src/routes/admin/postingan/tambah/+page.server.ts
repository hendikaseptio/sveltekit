import { db } from '$lib/server/db';
import { post, category, postCategory } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await db.select().from(category);
	return {
		categories
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const excerpt = formData.get('excerpt') as string;
		const cover = formData.get('cover') as string;
		const status = formData.get('status') as string;
		const publishedAtStr = formData.get('publishedAt') as string;
		const selectedCategories = formData.getAll('categories') as string[];

		// Simple slug generator
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');

		try {
			const [inserted] = await db.insert(post).values({
				title,
				slug,
				content,
				excerpt,
				cover,
				status,
				publishedAt: publishedAtStr ? new Date(publishedAtStr) : new Date()
			}).returning({ id: post.id });

			if (selectedCategories.length > 0) {
				await db.insert(postCategory).values(
					selectedCategories.map((categoryId) => ({
						postId: inserted.id,
						categoryId
					}))
				);
			}
		} catch (e) {
			console.error(e);
			return {
				error: 'Gagal membuat postingan. Pastikan judul unik.'
			};
		}

		throw redirect(303, '/admin/postingan');
	}
};
