import { db } from '$lib/server/db';
import { post, category, postCategory } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const postData = await db.query.post.findFirst({
		where: eq(post.id, params.id)
	});

	if (!postData) {
		throw error(404, 'Postingan tidak ditemukan');
	}

	const categories = await db.select().from(category);
	const postCategories = await db
		.select()
		.from(postCategory)
		.where(eq(postCategory.postId, params.id));

	return {
		post: postData,
		categories,
		postCategoryIds: postCategories.map((pc) => pc.categoryId)
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
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
			await db
				.update(post)
				.set({
					title,
					slug,
					content,
					excerpt,
					cover,
					status,
					publishedAt: publishedAtStr ? new Date(publishedAtStr) : new Date()
				})
				.where(eq(post.id, params.id));

			// Sync categories
			await db.delete(postCategory).where(eq(postCategory.postId, params.id));
			if (selectedCategories.length > 0) {
				await db.insert(postCategory).values(
					selectedCategories.map((categoryId) => ({
						postId: params.id,
						categoryId
					}))
				);
			}
		} catch (e) {
			console.error(e);
			return {
				error: 'Gagal memperbarui postingan. Pastikan judul unik.'
			};
		}

		throw redirect(303, '/admin/postingan');
	}
};
