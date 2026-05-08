import { db } from '$lib/server/db';
import { post, category } from '$lib/server/db/schema';
import { user } from '$lib/server/db/auth.schema';
import { desc, eq } from 'drizzle-orm';

export const load = async () => {
	const posts = await db
		.select({
			id: post.id,
			title: post.title,
			slug: post.slug,
			excerpt: post.excerpt,
			cover: post.cover,
			publishedAt: post.publishedAt,
			author: {
				name: user.name
			},
			category: {
				name: category.name
			}
		})
		.from(post)
		.leftJoin(user, eq(post.authorId, user.id))
		.leftJoin(category, eq(post.categoryId, category.id))
		.where(eq(post.status, 'published'))
		.orderBy(desc(post.publishedAt))
		.limit(10);

	const categories = await db.select().from(category);

	return {
		posts,
		categories
	};
};
