import { db } from '$lib/server/db';
import { category, post } from '$lib/server/db/schema';
import { user } from '$lib/server/db/auth.schema';
import { eq, desc } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { slug } = params;

	const categoryData = await db.query.category.findFirst({
		where: eq(category.slug, slug)
	});

	if (!categoryData) {
		throw error(404, 'Kategori tidak ditemukan');
	}

	const posts = await db.select({
		id: post.id,
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		cover: post.cover,
		publishedAt: post.publishedAt,
		author: {
			name: user.name
		}
	})
	.from(post)
	.leftJoin(user, eq(post.authorId, user.id))
	.where(eq(post.categoryId, categoryData.id))
	.orderBy(desc(post.publishedAt));

	return {
		category: categoryData,
		posts
	};
};
