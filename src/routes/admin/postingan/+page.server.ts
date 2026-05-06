import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	const posts = await db.select().from(post).orderBy(desc(post.publishedAt));
	
	// Format data for DataTable
	const formattedPosts = posts.map(p => ({
		id: p.id,
		header: p.title,
		type: 'Postingan',
		status: 'Published', // You might want to add a status field to schema later
		target: p.slug,
		limit: p.publishedAt ? p.publishedAt.toLocaleDateString('id-ID') : '-',
		reviewer: 'Admin'
	}));

	return {
		posts: formattedPosts
	};
};
