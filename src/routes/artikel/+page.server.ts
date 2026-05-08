import { db } from '$lib/server/db';
import { post, category, postCategory } from '$lib/server/db/schema';
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
		.leftJoin(postCategory, eq(post.id, postCategory.postId))
		.leftJoin(category, eq(postCategory.categoryId, category.id))
		.where(eq(post.status, 'published'))
		.groupBy(post.id)
		.orderBy(desc(post.publishedAt));

	return {
		posts
	};
};
