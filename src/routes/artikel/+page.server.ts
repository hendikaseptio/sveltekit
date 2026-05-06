import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	const posts = await db.select().from(post).orderBy(desc(post.publishedAt));

	// If empty, return some mock data for the UI
	if (posts.length === 0) {
		return {
			posts: [
				{
					id: '1',
					title: 'Selamat Datang di Blog SvelteKit Kami',
					slug: 'selamat-datang',
					excerpt: 'Ini adalah artikel pertama kami menggunakan SvelteKit dan Drizzle ORM.',
					content: 'Isi konten artikel lengkap...',
					publishedAt: new Date()
				},
				{
					id: '2',
					title: 'Belajar Shadcn Svelte',
					slug: 'belajar-shadcn',
					excerpt: 'Cara menggunakan komponen UI premium untuk aplikasi web Anda.',
					content: 'Isi konten artikel lengkap...',
					publishedAt: new Date()
				},
				{
					id: '3',
					title: 'Integrasi Database dengan Drizzle',
					slug: 'integrasi-drizzle',
					excerpt: 'Membuat skema database yang type-safe sangatlah mudah.',
					content: 'Isi konten artikel lengkap...',
					publishedAt: new Date()
				}
			]
		};
	}

	return {
		posts
	};
};
