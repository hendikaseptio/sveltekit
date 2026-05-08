import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const load = async () => {
	const posts = await db.select().from(post).orderBy(desc(post.publishedAt));
	
	// Format data for DataTable
	const formattedPosts = posts.map(p => ({
		id: p.id,
		header: p.title,
		type: 'Postingan',
		status: 'Published', // You might want to add a status field to schema later
		target: `/artikel/${p.slug}`,
		limit: p.publishedAt ? p.publishedAt.toLocaleDateString('id-ID') : '-',
		reviewer: 'Admin'
	}));

	return {
		posts: formattedPosts
	};
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) return { success: false };

		await db.delete(post).where(eq(post.id, id));
		return { success: true };
	}
};
