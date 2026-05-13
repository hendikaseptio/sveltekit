import { db } from '$lib/server/db';
import { analytics, post, page } from '$lib/server/db/schema';
import { sql, desc, count, and, gte } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// 1. Total Stats
	const totalVisitors = await db.select({ count: count() }).from(analytics);
	
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayVisitors = await db.select({ count: count() }).from(analytics).where(gte(analytics.createdAt, today));

	const lastMonth = new Date();
	lastMonth.setMonth(lastMonth.getMonth() - 1);
	const lastMonthVisitors = await db.select({ count: count() }).from(analytics).where(gte(analytics.createdAt, lastMonth));

	// 2. Top Pages
	const topPagesResult = await db.select({
		url: analytics.url,
		views: count()
	})
	.from(analytics)
	.groupBy(analytics.url)
	.orderBy(desc(count()))
	.limit(10);

	// 3. Analytics Chart Data (Last 30 days)
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	
	const chartDataResult = await db.select({
		date: sql`DATE(${analytics.createdAt} / 1000, 'unixepoch')`,
		count: count()
	})
	.from(analytics)
	.where(gte(analytics.createdAt, thirtyDaysAgo))
	.groupBy(sql`DATE(${analytics.createdAt} / 1000, 'unixepoch')`)
	.orderBy(sql`DATE(${analytics.createdAt} / 1000, 'unixepoch')`);

	// Format chart data for LayerChart
	const chartData = chartDataResult.map(row => ({
		date: new Date(row.date as string),
		desktop: Math.floor((row.count as number) * 0.7), // Mocking split for UI
		mobile: Math.ceil((row.count as number) * 0.3)
	}));

	// 4. Content Stats
	const totalPosts = await db.select({ count: count() }).from(post);
	const totalPages = await db.select({ count: count() }).from(page);

	return {
		stats: {
			totalVisitors: totalVisitors[0].count,
			todayVisitors: todayVisitors[0].count,
			lastMonthVisitors: lastMonthVisitors[0].count,
			totalPosts: totalPosts[0].count,
			totalPages: totalPages[0].count
		},
		topPages: topPagesResult.map((p, i) => ({
			id: i + 1,
			header: p.url,
			type: p.url.startsWith('/p/') ? 'Halaman' : p.url.startsWith('/artikel/') ? 'Postingan' : 'Lainnya',
			status: 'Active',
			target: p.views.toString(),
			limit: '-',
			reviewer: '-'
		})),
		chartData
	};
};
