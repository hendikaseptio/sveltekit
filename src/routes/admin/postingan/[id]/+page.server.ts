import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const postData = await db.query.post.findFirst({
		where: eq(post.id, params.id)
	});

	if (!postData) {
		throw error(404, 'Postingan tidak ditemukan');
	}

	return { post: postData };
};

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const excerpt = formData.get('excerpt') as string;
		const cover = formData.get('cover') as string;
		const status = formData.get('status') as string;
		const publishedAtStr = formData.get('publishedAt') as string;

		// Simple slug generator
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');

		try {
			await db.update(post)
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
		} catch (e) {
			console.error(e);
			return {
				error: 'Gagal memperbarui postingan. Pastikan judul unik.'
			};
		}

		throw redirect(303, '/admin/postingan');
	}
};
