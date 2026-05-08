import { db } from '$lib/server/db';
import { category, post } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const load = async () => {
    // Fetch categories with post count
    const categoriesWithCount = await db.select({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        postCount: sql<number>`count(${post.id})`
    })
    .from(category)
    .leftJoin(post, eq(category.id, post.categoryId))
    .groupBy(category.id);

    return {
        categories: categoriesWithCount
    };
};
